import TableWrapper from "../shared/TableWrapper";
import ApplicantRow from "./ApplicantRow";

const ApplicantsTable = ({ applications, refetch }) => {
  return (
    <TableWrapper>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Change Status</th>
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
