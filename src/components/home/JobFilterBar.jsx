import { useState } from "react";
import "./JobFilterBar.css";

const JobFilterBar = () => {
  const [open, setOpen] = useState(null);

  const toggleDropdown = (name) => {
    setOpen(open === name ? null : name);
  };

  return (
    <section className="job-filter-section">
      <div className="job-filter-title">
        <p>Take the Next Step in Your Career</p>
      </div>
      <div className="job-filter-container">
        {/* Job by Role */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => toggleDropdown("role")}
          >
            Jobs by Role ▾
          </button>

          {open === "role" && (
            <div className="dropdown">
              <p>Frontend Developer</p>
              <p>Backend Developer</p>
              <p>Full Stack Developer</p>
              <p>UI/UX Designer</p>
              <p>Data Scientist</p>
            </div>
          )}
        </div>

        {/* Job by Location */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => toggleDropdown("location")}
          >
            Jobs by Location ▾
          </button>

          {open === "location" && (
            <div className="dropdown">
              <p>Bangalore</p>
              <p>Mumbai</p>
              <p>Delhi</p>
              <p>Hyderabad</p>
              <p>Remote</p>
            </div>
          )}
        </div>

        {/* Job Type */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => toggleDropdown("type")}
          >
            Job Type ▾
          </button>

          {open === "type" && (
            <div className="dropdown">
              <p>Full Time</p>
              <p>Part Time</p>
              <p>Internship</p>
              <p>Contract</p>
            </div>
          )}
        </div>

        {/* Salary Range */}
        <div className="filter-item">
          <button
            className="filter-button"
            onClick={() => toggleDropdown("salary")}
          >
            Salary Range ▾
          </button>

          {open === "salary" && (
            <div className="dropdown">
              <p>3–6 LPA</p>
              <p>6–10 LPA</p>
              <p>10–20 LPA</p>
              <p>20+ LPA</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobFilterBar;
