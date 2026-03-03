import ApplicantStatusBadge from "./ApplicantStatusBadge";
import ApplicantActions from "./ApplicantActions";

const ApplicantRow = ({ application, refetch }) => {
  return (
    <tr className="applicant-row">
      <td>
        <div className="candidate-info">
          <span className="candidate-name">
            {application.candidateId?.name}
          </span>
        </div>
      </td>

      <td className="candidate-email">{application.candidateId?.email}</td>

      <td>
        <ApplicantStatusBadge status={application.status} />
      </td>

      <td>
        <div className="applicant-actions-wrapper">
          <ApplicantActions
            applicationId={application._id}
            currentStatus={application.status}
            refetch={refetch}
          />
        </div>
      </td>
    </tr>
  );
};

export default ApplicantRow;
