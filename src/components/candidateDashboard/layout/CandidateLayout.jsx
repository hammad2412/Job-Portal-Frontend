import { Outlet } from "react-router-dom";
import CandidateNavbar from "./CandidateNavbar";
import LeftSidebar from "./LeftSidebar";
import "./CandidateLayout.css";

const CandidateLayout = () => {
  return (
    <div className="candidate-layout">
      <CandidateNavbar />

      <div className="candidate-layout-body">
        <div className="sidebar-display">
          <LeftSidebar />
        </div>
        <main className="candidate-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
