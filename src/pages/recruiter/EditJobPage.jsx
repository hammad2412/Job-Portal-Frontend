import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleJob, updateJob } from "../../services/recruiterJob.service";
import ConfirmModal from "../../components/recruiter/shared/ConfirmModal";
import "../../styles/recruiter/editJobPage.css";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    skillsRequired: "",
    experienceLevel: "fresher",
    jobType: "full-time",
    salaryRange: "",
    location: "",
    isRemote: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getSingleJob(jobId);
        const job = res.data;

        setFormData({
          title: job.title,
          description: job.description,
          requirements: job.requirements || "",
          skillsRequired: job.skillsRequired.join(", "),
          experienceLevel: job.experienceLevel,
          jobType: job.jobType,
          salaryRange: job.salaryRange || "",
          location: job.location,
          isRemote: job.isRemote,
        });
      } catch (err) {
        setError("Failed to load job");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.location.trim()) return "Location is required";
    if (!formData.skillsRequired.trim())
      return "At least one skill is required";
    return null;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    try {
      setSaving(true);
      await updateJob(jobId, {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      });

      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <div className="edit-loading">Loading job...</div>;

  return (
    <>
      <div className="edit-job-page">
        <div className="edit-header">
          <h2>Edit Job</h2>
          <p>Update job details carefully before saving changes.</p>
        </div>

        <form className="edit-job-form" onSubmit={handleSubmitClick}>
          {error && <div className="edit-error">{error}</div>}

          <div className="edit-grid">
            <div className="form-group full-width">
              <label>Job Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
              >
                <option value="fresher">Fresher</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleChange}
                />
                Remote Position
              </label>
            </div>
          </div>

          <div className="edit-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to update "${formData.title}"?`}
          confirmText="Update Job"
          cancelText="Review Again"
          variant="primary"
          onConfirm={confirmUpdate}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default EditJobPage;
