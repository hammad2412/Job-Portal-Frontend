import { useState } from "react";
import axios from "../../../../api/axios";
import "./ProjectsSection.css";

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

const ProjectModal = ({ projects, closeModal, refreshProfile }) => {
  const [projectList, setProjectList] = useState(projects);

  const handleChange = (index, field, value) => {
    const updated = [...projectList];

    if (field === "startYear" || field === "endYear") {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value;
    }

    if (field === "currentlyWorking" && value) {
      updated[index].endMonth = "";
      updated[index].endYear = "";
    }

    setProjectList(updated);
  };

  const handleTechChange = (index, value) => {
    const updated = [...projectList];
    updated[index].techStack = value.split(",").map((t) => t.trim());
    setProjectList(updated);
  };

  const handleAddProject = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        description: "",
        techStack: [],
        githubLink: "",
        liveLink: "",
        role: "",
        startMonth: "Jan",
        startYear: 2025,
        endMonth: "",
        endYear: "",
        currentlyWorking: false,
      },
    ]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/candidate-project/${id}`);

      await refreshProfile();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    const validProjects = projectList.filter(
      (p) =>
        p.title &&
        p.description &&
        p.role &&
        p.githubLink &&
        p.techStack?.length > 0,
    );

    for (let project of validProjects) {
      const payload = {
        title: project.title,
        description: project.description,
        role: project.role,
        techStack: project.techStack,
        githubLink: project.githubLink,
        liveLink: project.liveLink || undefined,
        startMonth: project.startMonth,
        startYear: Number(project.startYear),
        endMonth: project.currentlyWorking ? null : project.endMonth,
        endYear: project.currentlyWorking ? null : Number(project.endYear),
        currentlyWorking: project.currentlyWorking,
      };

      if (!project._id) {
        console.log("CREATE:", payload);
        await axios.post("/candidate-project", payload);
      } else {
        console.log("UPDATE:", payload);
        await axios.patch(`/candidate-project/${project._id}`, payload);
      }
    }

    await refreshProfile();
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="project-modal">
        <h3>Edit Projects</h3>

        <div className="project-list">
          {projectList.map((project, index) => (
            <div key={index} className="project-card">
              <input
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />

              <input
                placeholder="Role"
                value={project.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
              />

              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />

              <input
                placeholder="Tech Stack (React, Node, MongoDB)"
                value={project.techStack?.join(", ") || ""}
                onChange={(e) => handleTechChange(index, e.target.value)}
              />

              <input
                placeholder="Github Link (https://github.com/...)"
                value={project.githubLink || ""}
                onChange={(e) =>
                  handleChange(index, "githubLink", e.target.value)
                }
              />

              <input
                placeholder="Live Link (https://...)"
                value={project.liveLink || ""}
                onChange={(e) =>
                  handleChange(index, "liveLink", e.target.value)
                }
              />

              <div className="date-row">
                <select
                  value={project.startMonth}
                  onChange={(e) =>
                    handleChange(index, "startMonth", e.target.value)
                  }
                >
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={project.startYear}
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
                  disabled={project.currentlyWorking}
                  value={project.endMonth || ""}
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
                  disabled={project.currentlyWorking}
                  value={project.endYear || ""}
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
                    checked={project.currentlyWorking}
                    onChange={(e) =>
                      handleChange(index, "currentlyWorking", e.target.checked)
                    }
                  />
                  Ongoing
                </label>
              </div>

              <button
                className="delete-project-btn"
                onClick={() =>
                  project._id
                    ? handleDelete(project._id)
                    : setProjectList(projectList.filter((_, i) => i !== index))
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button className="add-project-btn" onClick={handleAddProject}>
          + Add Project
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

export default ProjectModal;
