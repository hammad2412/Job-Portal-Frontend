import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/recruiterJob.service";
import "../../styles/recruiter/postJobPage.css";

const PostJobPage = () => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      };

      await createJob(payload);
      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="post-job-header">
        <h2>Post New Job</h2>
        <p>Create a new job listing to attract candidates.</p>
      </div>

      <form className="post-job-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-grid">
          <div className="form-group full-width">
            <label>Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
              required
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
              required
            />
          </div>

          <div className="form-group checkbox-group full-width">
            <label>
              <input
                type="checkbox"
                name="isRemote"
                checked={formData.isRemote}
                onChange={handleChange}
              />
              Remote Job
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;
