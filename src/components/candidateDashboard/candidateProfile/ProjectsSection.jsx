import { useState } from "react";
import axios from "../../../api/axios";
import Modal from "../Modal";
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
for (let i = 2000; i <= 2026; i++) years.push(i);

const formatProjectDate = (project) => {
  if (project.currentlyWorking) {
    return `${project.startMonth} ${project.startYear} - Present`;
  }

  return `${project.startMonth} ${project.startYear} - ${project.endMonth} ${project.endYear}`;
};

const ProjectsSection = ({ projects, refreshProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [projectList, setProjectList] = useState(projects);
  const [error, setError] = useState("");

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

  const handleDelete = async (id, index) => {
    if (!id) {
      setProjectList(projectList.filter((_, i) => i !== index));
      return;
    }

    try {
      await axios.delete(`/candidate-project/${id}`);

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  const handleSave = async () => {
    try {
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
          await axios.post("/candidate-project", payload);
        } else {
          await axios.patch(`/candidate-project/${project._id}`, payload);
        }
      }

      await refreshProfile();
      setOpenModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save projects");
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Projects</h3>

        <button
          className="section-edit-btn"
          onClick={() => {
            setError("");
            setProjectList(projects);
            setOpenModal(true);
          }}
        >
          Edit
        </button>
      </div>

      {projects?.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="project-item">
            <h4>{project.title}</h4>

            <p className="project-role">{project.role}</p>

            <p className="project-date">{formatProjectDate(project)}</p>

            <p className="project-desc">{project.description}</p>

            <p className="project-tech">{project.techStack?.join(", ")}</p>

            <div className="project-links">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank">
                  Github
                </a>
              )}

              {project.liveLink && (
                <a href={project.liveLink} target="_blank">
                  Live
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="empty-section-text">No projects added</p>
      )}

      {openModal && (
        <Modal title="Edit Projects" onClose={() => setOpenModal(false)}>
          {error && <p className="form-error">{error}</p>}

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
                  placeholder="Github Link"
                  value={project.githubLink || ""}
                  onChange={(e) =>
                    handleChange(index, "githubLink", e.target.value)
                  }
                />

                <input
                  placeholder="Live Link"
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
                        handleChange(
                          index,
                          "currentlyWorking",
                          e.target.checked,
                        )
                      }
                    />
                    Ongoing
                  </label>
                </div>

                <button
                  className="delete-project-btn"
                  onClick={() => handleDelete(project._id, index)}
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

export default ProjectsSection;
