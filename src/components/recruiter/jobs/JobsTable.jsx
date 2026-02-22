import TableWrapper from "../shared/TableWrapper";
import JobRow from "./JobRow";

const JobsTable = ({ jobs, refetch }) => {
  return (
    <TableWrapper>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Applications</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <JobRow key={job._id} job={job} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default JobsTable;
