import { useState } from "react";
import axios from "../../../../api/axios";
import "./SkillsSection.css";

const SkillsModal = ({ skills, closeModal, refreshProfile }) => {
  const [skillList, setSkillList] = useState(skills);

  const proficiencyOptions = ["beginner", "intermediate", "advanced", "expert"];

  const handleAddSkill = () => {
    setSkillList([
      ...skillList,
      { skillName: "", proficiency: "intermediate", yearsExperience: 0 },
    ]);
  };

  const handleDeleteSkill = async (id) => {
    if (!id) {
      setSkillList(skillList.filter((_, i) => i !== skillList.length - 1));
      return;
    }

    try {
      await axios.delete(`/candidate-skills/${id}`);

      await refreshProfile();
      closeModal();
    } catch (err) {
      console.error(err);
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
      closeModal();
    } catch (err) {
      console.error(err);
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
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="skills-modal">
        <div className="modal-header">
          <h3>Edit Skills</h3>

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
                  <option key={p} value={p}>
                    {p}
                  </option>
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

export default SkillsModal;
