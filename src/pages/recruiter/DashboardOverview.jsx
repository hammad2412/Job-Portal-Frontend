import useRecruiterJobs from "../../hooks/useRecruiterJobs";
import StatsCards from "../../components/recruiter/dashboard/StatsCards";
import RecentJobs from "../../components/recruiter/dashboard/RecentJobs";
import "../../styles/recruiter/recruiterDashboard.css";

const DashboardOverview = () => {
  const { jobs, loading, error } = useRecruiterJobs({ limit: 5 });

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "open").length;
  const closedJobs = jobs.filter((j) => j.status === "closed").length;
  const pausedJobs = jobs.filter((j) => j.status === "paused").length;

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <p className="dashboard-subtitle">
          Monitor and manage your job postings efficiently.
        </p>
      </div>

      <StatsCards
        total={totalJobs}
        open={openJobs}
        closed={closedJobs}
        paused={pausedJobs}
      />

      <div className="dashboard-section">
        <RecentJobs jobs={jobs} />
      </div>
    </div>
  );
};

export default DashboardOverview;
