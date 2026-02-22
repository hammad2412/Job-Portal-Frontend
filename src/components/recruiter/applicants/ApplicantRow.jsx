import ApplicantStatusBadge from "./ApplicantStatusBadge";
import ApplicantActions from "./ApplicantActions";

const ApplicantRow = ({ application, refetch }) => {
  return (
    <tr>
      <td>{application.candidateId?.name}</td>
      <td>{application.candidateId?.email}</td>
      <td>
        <ApplicantStatusBadge status={application.status} />
      </td>
      <td>
        <ApplicantActions
          applicationId={application._id}
          currentStatus={application.status}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default ApplicantRow;
