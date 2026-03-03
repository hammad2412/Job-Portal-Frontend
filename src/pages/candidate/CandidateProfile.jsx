import { useEffect, useState } from "react";
import "./CandidateProfile.css";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);

  // 🔥 Temporary dummy data (replace with API later)
  useEffect(() => {
    setProfile({
      name: "Mohammad Hammad Khan",
      email: "hammadk1224@gmail.com",
      location: "Jaipur",
      headline: "Full Stack Developer",
      summary:
        "Passionate MERN stack developer with strong backend architecture knowledge and scalable API design experience.",
      experienceYears: 1,
      skills: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      education: [
        {
          degree: "B.Tech (Full Time)",
          institution: "Arya College of Engineering, Jaipur",
          startYear: 2021,
          endYear: 2025,
        },
      ],
      experience: [],
      projects: [],
    });
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="candidate-profile-page">
      {/* LEFT SIDEBAR */}
      <div className="profile-sidebar">
        <div className="profile-card">
          <div className="profile-avatar"></div>

          <h2>{profile.name}</h2>
          <p className="profile-email">{profile.email}</p>

          <p className="profile-location">📍 {profile.location}</p>

          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="profile-main">
        {/* PROFESSIONAL DETAILS */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Professional Details</h3>
            <button className="section-edit-btn">✏</button>
          </div>

          <h4>{profile.headline}</h4>
          <p className="profile-summary">{profile.summary}</p>

          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Education</h3>
            <button className="section-edit-btn">✏</button>
          </div>

          {profile.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4>{edu.degree}</h4>
              <p>{edu.institution}</p>
              <span>
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Experience</h3>
            <button className="section-edit-btn">✏</button>
          </div>

          {profile.experience.length === 0 ? (
            <p className="empty-text">No experience added yet.</p>
          ) : (
            profile.experience.map((exp, index) => <div key={index}></div>)
          )}
        </div>

        {/* PROJECTS */}
        <div className="profile-section">
          <div className="section-header">
            <h3>Projects</h3>
            <button className="section-edit-btn">✏</button>
          </div>

          {profile.projects.length === 0 ? (
            <p className="empty-text">No projects added yet.</p>
          ) : (
            profile.projects.map((proj, index) => <div key={index}></div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
