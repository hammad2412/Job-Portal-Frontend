import { useState } from "react";
import axios from "../../../api/axios";
import Modal from "../Modal";
import "./SkillsSection.css";

const SkillsSection = ({ skills, refreshProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [skillList, setSkillList] = useState(skills);
  const [error, setError] = useState("");

  const proficiencyOptions = ["beginner", "intermediate", "advanced", "expert"];

  const handleAddSkill = () => {
    setSkillList([
      ...skillList,
      { skillName: "", proficiency: "intermediate", yearsExperience: 0 },
    ]);
  };

  const handleDeleteSkill = async (id) => {
    if (!id) {
      setSkillList(skillList.slice(0, -1));
      return;
    }

    try {
      await axios.delete(`/candidate-skills/${id}`);

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete skill");
    }
  };

  const handleClearAll = async () => {
    try {
      await Promise.all(
        skillList.map((skill) =>
          axios.delete(`/candidate-skills/${skill._id}`),
        ),
      );

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to clear skills");
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...skillList];
    updated[index][field] = value;
    setSkillList(updated);
  };

  const handleSave = async () => {
    try {
      for (let skill of skillList) {
        if (!skill._id) {
          await axios.post("/candidate-skills", skill);
        } else {
          await axios.patch(`/candidate-skills/${skill._id}`, skill);
        }
      }

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save skills");
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Skills</h3>

        <button
          className="section-edit-btn"
          onClick={() => {
            setError("");
            setSkillList(skills);
            setOpenModal(true);
          }}
        >
          Edit
        </button>
      </div>

      {skills.length > 0 ? (
        <div className="skills-container">
          {skills.map((skill) => (
            <span key={skill._id} className="skill-tag">
              {skill.skillName}
            </span>
          ))}
        </div>
      ) : (
        <p className="empty-section-text">No skills added</p>
      )}

      {openModal && (
        <Modal title="Edit Skills" onClose={() => setOpenModal(false)}>
          {error && <p className="form-error">{error}</p>}

          <div className="skills-modal-header">
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear all
            </button>
          </div>

          <div className="skills-edit-list">
            {skillList.map((skill, index) => (
              <div key={index} className="skill-edit-row">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill.skillName}
                  onChange={(e) =>
                    handleChange(index, "skillName", e.target.value)
                  }
                />

                <select
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleChange(index, "proficiency", e.target.value)
                  }
                >
                  {proficiencyOptions.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>

                <input
                  type="number"
                  min="0"
                  value={skill.yearsExperience}
                  onChange={(e) =>
                    handleChange(index, "yearsExperience", e.target.value)
                  }
                />

                <button
                  className="delete-skill-btn"
                  onClick={() => handleDeleteSkill(skill._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button className="add-skill-btn" onClick={handleAddSkill}>
            + Add Skill
          </button>

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

            <button className="modal-submit-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SkillsSection;
