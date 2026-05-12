import { useState } from "react";
import axios from "../../../api/axios";
import { parseResume } from "../../../services/candidateProfile.service";
import Modal from "../Modal";
import ProfileCompletion from "./ProfileCompletion";
import "./ProfileHeader.css";

const ProfileHeader = ({
  profile,
  userName,
  userEmail,
  showCreateButton,
  refreshProfile,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [isParsingResume, setIsParsingResume] = useState(false);

  const name = profile?.userId?.name || userName;
  const email = profile?.userId?.email || userEmail;
  const headline = profile?.headline;
  const about = profile?.about;

  const completion = profile?.profileCompletion || 0;

  const avatarLetter = name ? name.charAt(0).toUpperCase() : "U";

  const [formData, setFormData] = useState({
    name: profile?.userId?.name || userName || "",
    email: profile?.userId?.email || userEmail || "",
    headline: profile?.headline || "",
    about: profile?.about || "",
  });

  const handleChange = (field, value) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/candidate-profile", formData);

      await refreshProfile();
      setOpenModal(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setIsParsingResume(true);
      setError("");

      await parseResume(formData);

      await refreshProfile();

      alert("Resume parsed successfully!");
    } catch (error) {
      console.error("Resume parsing failed:", error);

      alert(error.response?.data?.message || "Failed to parse resume.");
    } finally {
      setIsParsingResume(false);

      // Reset input so same file can be selected again
      e.target.value = "";
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-card">
        <ProfileCompletion completion={completion} letter={avatarLetter} />

        <h2>{name}</h2>
        <p className="profile-email">{email}</p>

        {headline && <p className="profile-headline">{headline}</p>}
        {about && <p className="profile-about">{about}</p>}

        {/* Resume Upload Section */}
        <div className="resume-upload-box">
          <label className="resume-upload-label">
            {isParsingResume
              ? "Parsing Resume..."
              : "Upload Resume (AI Auto-Fill)"}
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            disabled={isParsingResume}
            className="resume-upload-input"
          />

          <p className="resume-upload-hint">
            Upload your resume to automatically fill Headline and skills.
          </p>
        </div>

        {showCreateButton ? (
          <button
            className="add-btn"
            onClick={() => {
              setError("");
              setOpenModal(true);
            }}
          >
            Create Profile
          </button>
        ) : (
          <button
            className="edit-profile-btn"
            onClick={() => {
              setError("");
              setOpenModal(true);
            }}
          >
            Update Profile
          </button>
        )}
      </div>

      {openModal && (
        <Modal
          title="Update Your Profile"
          onClose={() => {
            setError("");
            setOpenModal(false);
          }}
        >
          {error && <p className="form-error">{error}</p>}

          <div className="profile-modal">
            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <input readOnly placeholder="Email" value={formData.email} />

            <input
              placeholder="Headline (e.g. MERN Stack Developer)"
              value={formData.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
            />

            <textarea
              placeholder="About yourself"
              value={formData.about}
              onChange={(e) => handleChange("about", e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setError("");
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>

              <button className="modal-submit-btn" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileHeader;
