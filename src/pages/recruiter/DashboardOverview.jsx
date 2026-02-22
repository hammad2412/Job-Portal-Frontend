import useRecruiterJobs from "../../hooks/useRecruiterJobs";
import StatsCards from "../../components/recruiter/dashboard/StatsCards";
import RecentJobs from "../../components/recruiter/dashboard/RecentJobs";
import "../../styles/recruiter/recruiterDashboard.css";

const DashboardOverview = () => {
  const { jobs, loading, error } = useRecruiterJobs({ limit: 5 });

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "open").length;
  const closedJobs = jobs.filter((j) => j.status === "closed").length;
  const pausedJobs = jobs.filter((j) => j.status === "paused").length;

  return (
    <div className="dashboard-overview">
      <h2>Dashboard</h2>

      <StatsCards
        total={totalJobs}
        open={openJobs}
        closed={closedJobs}
        paused={pausedJobs}
      />

      <RecentJobs jobs={jobs} />
    </div>
  );
};

export default DashboardOverview;
