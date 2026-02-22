import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";
import JobActionsDropdown from "./JobActionsDropdown";

const JobRow = ({ job, refetch }) => {
  return (
    <tr>
      <td>{job.title}</td>
      <td>{job.location}</td>
      <td>{job.applicationsCount}</td>
      <td>
        <StatusBadge status={job.status} />
      </td>
      <td>
        <JobActionsDropdown
          jobId={job._id}
          currentStatus={job.status}
          refetch={refetch}
        />
      </td>
      <td>
        <Link to={`/recruiter/jobs/${job._id}`}>View</Link>
      </td>
    </tr>
  );
};

export default JobRow;
