import JobSearchBar from "../../components/candidateDashboard/search/JobSearchBar";
import JobFeed from "../../components/candidateDashboard/jobs/JobFeed";
import "./CandidateDashboard.css";

const CandidateDashboard = () => {
  return (
    <div className="candidate-dashboard-page">
      <div className="layout-search-content">
        <h2 className="search-heading">Find your next opportunity</h2>
      </div>
      <JobSearchBar />
      <div className="dashboard-feed-wrapper">
        <JobFeed />
      </div>
    </div>
  );
};

export default CandidateDashboard;
