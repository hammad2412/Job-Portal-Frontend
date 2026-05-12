import "./ProfileCompletion.css";

const ProfileCompletion = ({ completion = 0, letter }) => {
  const radius = 40;
  const stroke = 4;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (completion / 100) * circumference;

  // dynamic color
  let progressColor = "#ef4444"; // red

  if (completion >= 40 && completion < 70) {
    progressColor = "#f59e0b"; // orange
  }

  if (completion >= 70) {
    progressColor = "#22c55e"; // green
  }

  return (
    <div className="avatar-progress-wrapper">
      <svg height={radius * 2} width={radius * 2} className="progress-ring">
        <circle
          className="progress-bg"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="profile-avatar">{letter}</div>

      <span className="completion-text" style={{ color: progressColor }}>
        {completion}%
      </span>
    </div>
  );
};

export default ProfileCompletion;
