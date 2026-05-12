import { useState } from "react";
import axios from "../../../../api/axios";
import "./ProfileHeader.css";

const CreateProfileModal = ({
  userName,
  userEmail,
  profile,
  closeModal,
  refreshProfile,
}) => {
  const [formData, setFormData] = useState({
    name: profile?.userId?.name || userName || "",
    email: profile?.userId?.email || userEmail || "",
    headline: profile?.headline || "",
    about: profile?.about || "",
  });
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/candidate-profile", formData);

      console.log("Server Response:", response);

      console.log("Profile created:", response.data);

      await refreshProfile();
      closeModal();
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("SERVER RESPONSE:", error.response);
      console.log("SERVER DATA:", error.response?.data);
      console.error("Create profile error:", error.response?.data);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="profile-modal">
        <h3>Update Your Profile</h3>

        <input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          placeholder="Email"
          readOnly
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

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
          <button className="modal-cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button
            type="button"
            className="modal-submit-btn"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfileModal;
