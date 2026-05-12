import { useState } from "react";
import axios from "../../../api/axios";
import Modal from "../Modal";
import "./ExperienceSection.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const years = [];
for (let i = 2000; i <= 2026; i++) years.push(i);

const employmentTypes = [
  "full-time",
  "part-time",
  "internship",
  "contract",
  "freelance",
];

const formatExperienceDate = (exp) => {
  if (exp.currentlyWorking) {
    return `${exp.startMonth} ${exp.startYear} - Present`;
  }

  return `${exp.startMonth} ${exp.startYear} - ${exp.endMonth} ${exp.endYear}`;
};

const ExperienceSection = ({ experience, refreshProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [experienceList, setExperienceList] = useState(experience);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;

    if (field === "currentlyWorking" && value) {
      updated[index].endMonth = "";
      updated[index].endYear = "";
    }

    setExperienceList(updated);
  };

  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        company: "",
        role: "",
        employmentType: "full-time",
        location: "",
        startMonth: "Jan",
        startYear: 2024,
        endMonth: "",
        endYear: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const handleDelete = async (id) => {
    if (!id) {
      setExperienceList(experienceList.slice(0, -1));
      return;
    }

    try {
      await axios.delete(`/candidate-experience/${id}`);

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete experience");
    }
  };

  const handleSave = async () => {
    try {
      const validExperience = experienceList.filter(
        (exp) => exp.company && exp.role,
      );

      for (let exp of validExperience) {
        const payload = {
          ...exp,
          endMonth: exp.currentlyWorking ? null : exp.endMonth,
          endYear: exp.currentlyWorking ? null : exp.endYear,
        };

        if (!exp._id) {
          await axios.post("/candidate-experience", payload);
        } else {
          await axios.patch(`/candidate-experience/${exp._id}`, payload);
        }
      }

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save experience");
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Experience</h3>

        <button
          className="section-edit-btn"
          onClick={() => {
            setError("");
            setExperienceList(experience);
            setOpenModal(true);
          }}
        >
          Edit
        </button>
      </div>

      {experience?.length > 0 ? (
        experience.map((exp) => (
          <div key={exp._id} className="experience-item">
            <h4>{exp.role}</h4>

            <p className="exp-company">
              {exp.company} • {exp.employmentType}
            </p>

            <p className="exp-date">{formatExperienceDate(exp)}</p>

            {exp.location && <p className="exp-location">{exp.location}</p>}
          </div>
        ))
      ) : (
        <p className="empty-section-text">No experience added</p>
      )}

      {openModal && (
        <Modal title="Edit Experience" onClose={() => setOpenModal(false)}>
          {error && <p className="form-error">{error}</p>}

          <div className="experience-list">
            {experienceList.map((exp, index) => (
              <div key={index} className="experience-card">
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(index, "company", e.target.value)
                  }
                />

                <input
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                />

                <select
                  value={exp.employmentType}
                  onChange={(e) =>
                    handleChange(index, "employmentType", e.target.value)
                  }
                >
                  {employmentTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>

                <input
                  placeholder="Location"
                  value={exp.location || ""}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                />

                <div className="date-row">
                  <select
                    value={exp.startMonth}
                    onChange={(e) =>
                      handleChange(index, "startMonth", e.target.value)
                    }
                  >
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={exp.startYear}
                    onChange={(e) =>
                      handleChange(index, "startYear", e.target.value)
                    }
                  >
                    {years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="date-row">
                  <select
                    disabled={exp.currentlyWorking}
                    value={exp.endMonth || ""}
                    onChange={(e) =>
                      handleChange(index, "endMonth", e.target.value)
                    }
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>

                  <select
                    disabled={exp.currentlyWorking}
                    value={exp.endYear || ""}
                    onChange={(e) =>
                      handleChange(index, "endYear", e.target.value)
                    }
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>

                  <label className="working-checkbox">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "currentlyWorking",
                          e.target.checked,
                        )
                      }
                    />
                    Currently working
                  </label>
                </div>

                <textarea
                  placeholder="Description"
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />

                <button
                  className="delete-exp-btn"
                  onClick={() => handleDelete(exp._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button className="add-exp-btn" onClick={handleAddExperience}>
            + Add Experience
          </button>

          <div className="modal-actions">
            <button
              className="modal-cancel-btn"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>

            <button className="modal-submit-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExperienceSection;
