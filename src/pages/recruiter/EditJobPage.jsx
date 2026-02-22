import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleJob, updateJob } from "../../services/recruiterJob.service";

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

  // Fetch existing job
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
        console.error(err);
        setError("Failed to load job");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateJob(jobId, {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      });

      navigate(`/recruiter/jobs/${jobId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading job...</p>;

  return (
    <div>
      <h2>Edit Job</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills (comma separated)"
          value={formData.skillsRequired}
          onChange={handleChange}
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
          type="text"
          name="salaryRange"
          placeholder="Salary Range"
          value={formData.salaryRange}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="isRemote"
            checked={formData.isRemote}
            onChange={handleChange}
          />
          Remote
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
