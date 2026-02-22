import StatCard from "./StatCard";

const StatsCards = ({ total, open, closed, paused }) => {
  return (
    <div className="stats-grid">
      <StatCard title="Total Jobs" value={total} />
      <StatCard title="Open Jobs" value={open} />
      <StatCard title="Closed Jobs" value={closed} />
      <StatCard title="Paused Jobs" value={paused} />
    </div>
  );
};

export default StatsCards;
