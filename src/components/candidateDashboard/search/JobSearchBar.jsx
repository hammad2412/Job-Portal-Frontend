import "./JobSearchBar.css";

const JobSearchBar = () => {
  return (
    <div className="job-search-section">
      <div className="search-bar">
        <input type="text" placeholder="Search jobs, companies..." />

        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default JobSearchBar;
