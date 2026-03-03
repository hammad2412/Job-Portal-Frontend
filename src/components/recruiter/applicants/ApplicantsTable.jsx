import TableWrapper from "../shared/TableWrapper";
import ApplicantRow from "./ApplicantRow";
import "../../../styles/recruiter/applicantsTable.css";

const ApplicantsTable = ({ applications, refetch }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="applicants-empty">
        <p>No applications found.</p>
      </div>
    );
  }

  return (
    <TableWrapper>
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <ApplicantRow
              key={application._id}
              application={application}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default ApplicantsTable;
