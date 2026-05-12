import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./CandidateProfile.css";

import ProfileHeader from "../../components/candidateDashboard/candidateProfile/ProfileHeader";
import SkillsSection from "../../components/candidateDashboard/candidateProfile/SkillsSection";
import EducationSection from "../../components/candidateDashboard/candidateProfile/EducationSection";
import ExperienceSection from "../../components/candidateDashboard/candidateProfile/ExperienceSection";
import ProjectsSection from "../../components/candidateDashboard/candidateProfile/ProjectsSection";
import PreferenceSection from "../../components/candidateDashboard/candidateProfile/PreferenceSection";

const CandidateProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/candidate-profile/full-profile");
      setData({ ...res.data.data });
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const userName = data?.profile?.userId?.name || data?.user?.name;
  const userEmail = data?.profile?.userId?.email || data?.user?.email;

  if (!data?.profile) {
    return (
      <div className="candidate-profile-page">
        <ProfileHeader
          profile={null}
          userName={userName}
          userEmail={userEmail}
          showCreateButton
          refreshProfile={fetchProfile}
        />
        <div className="profile-main">
          <p className="empty-profile-message">
            Create your profile to start adding skills, education, experience
            and projects.
          </p>
        </div>
      </div>
    );
  }

  const { profile, skills, education, experience, projects, preferences } =
    data;

  return (
    <div className="candidate-profile-page">
      <ProfileHeader profile={profile} refreshProfile={fetchProfile} />

      <div className="profile-main">
        <SkillsSection skills={skills} refreshProfile={fetchProfile} />

        <EducationSection education={education} refreshProfile={fetchProfile} />

        <ExperienceSection
          experience={experience}
          refreshProfile={fetchProfile}
        />

        <ProjectsSection projects={projects} refreshProfile={fetchProfile} />

        <PreferenceSection
          preferences={preferences}
          refreshProfile={fetchProfile}
        />
      </div>
    </div>
  );
};

export default CandidateProfile;
