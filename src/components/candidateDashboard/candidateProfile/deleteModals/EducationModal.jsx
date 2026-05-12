import { useState } from "react";
import axios from "../../../../api/axios";
import "./EducationSection.css";

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
for (let i = 2000; i <= 2026; i++) {
  years.push(i);
}

const EducationModal = ({ education, closeModal, refreshProfile }) => {
  const [educationList, setEducationList] = useState(education);

  const handleChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;

    if (field === "currentlyStudying" && value) {
      updated[index].endMonth = "";
      updated[index].endYear = "";
    }

    setEducationList(updated);
  };

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        fieldOfStudy: "",
        institution: "",
        startMonth: "Jan",
        startYear: new Date().getFullYear(),
        endMonth: "",
        endYear: "",
        currentlyStudying: false,
        grade: "",
        description: "",
      },
    ]);
  };

  const handleDeleteEducation = async (id) => {
    if (!id) {
      setEducationList(educationList.slice(0, -1));
      return;
    }

    try {
      await axios.delete(`/candidate-education/${id}`);

      await refreshProfile();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const validEducation = educationList.filter(
        (edu) => edu.degree && edu.institution,
      );

      for (let edu of validEducation) {
        const payload = {
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          institution: edu.institution,
          startMonth: edu.startMonth,
          startYear: edu.startYear,
          endMonth: edu.currentlyStudying ? null : edu.endMonth,
          endYear: edu.currentlyStudying ? null : edu.endYear,
          currentlyStudying: edu.currentlyStudying,
          grade: edu.grade,
          description: edu.description,
        };

        if (!edu._id) {
          await axios.post("/candidate-education", payload);
        } else {
          await axios.patch(`/candidate-education/${edu._id}`, payload);
        }
      }

      await refreshProfile();
      closeModal();
    } catch (err) {
      console.log(err.response?.data);
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="education-modal">
        <h3>Edit Education</h3>

        <div className="education-list">
          {educationList.map((edu, index) => (
            <div key={index} className="education-edit-card">
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
              />

              <input
                placeholder="Field of Study"
                value={edu.fieldOfStudy || ""}
                onChange={(e) =>
                  handleChange(index, "fieldOfStudy", e.target.value)
                }
              />

              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleChange(index, "institution", e.target.value)
                }
              />

              <div className="date-row">
                <select
                  value={edu.startMonth}
                  onChange={(e) =>
                    handleChange(index, "startMonth", e.target.value)
                  }
                >
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={edu.startYear}
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
                  disabled={edu.currentlyStudying}
                  value={edu.endMonth || ""}
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
                  disabled={edu.currentlyStudying}
                  value={edu.endYear || ""}
                  onChange={(e) =>
                    handleChange(index, "endYear", e.target.value)
                  }
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                <label className="studying-checkbox">
                  <input
                    type="checkbox"
                    checked={edu.currentlyStudying}
                    onChange={(e) =>
                      handleChange(index, "currentlyStudying", e.target.checked)
                    }
                  />
                  Currently studying
                </label>
              </div>

              <input
                placeholder="Grade"
                value={edu.grade || ""}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
              />

              <button
                className="delete-education-btn"
                onClick={() => handleDeleteEducation(edu._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button className="add-education-btn" onClick={handleAddEducation}>
          + Add Education
        </button>

        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button className="modal-submit-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
