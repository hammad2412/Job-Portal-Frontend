import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/recruiterJob.service";

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

      const response = await createJob(payload);
      console.log("Create Job Response:", response);

      navigate("/recruiter/jobs");
    } catch (err) {
      console.error("Create Job Error:", err);
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Post New Job</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

        <input
          name="skillsRequired"
          placeholder="Skills (comma separated)"
          value={formData.skillsRequired}
          onChange={handleChange}
          required
        />

        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
        >
          <option value="fresher">Fresher</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>

        <input
          name="salaryRange"
          placeholder="Salary Range"
          value={formData.salaryRange}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="isRemote"
            checked={formData.isRemote}
            onChange={handleChange}
          />
          Remote Job
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJobPage;
