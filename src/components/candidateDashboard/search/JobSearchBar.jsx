import { useState, useRef, useEffect } from "react";
import "./JobSearchBar.css";

const JobSearchBar = () => {
  const [activeField, setActiveField] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const searchRef = useRef(null);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔥 Search function
  const handleSearch = () => {
    console.log("Searching...");
    console.log("Title:", title);
    console.log("Location:", location);

    // Later connect this to API
  };

  // 🔥 Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="job-search-section">
      <div className="search-container" ref={searchRef}>
        <div
          className={`input-group ${activeField === "title" ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setActiveField("title")}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="divider"></div>

        <div
          className={`input-group ${activeField === "location" ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="Delhi, Delhi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setActiveField("location")}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Find jobs
        </button>
      </div>
    </div>
  );
};

export default JobSearchBar;
