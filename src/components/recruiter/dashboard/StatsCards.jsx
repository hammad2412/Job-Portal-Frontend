import StatCard from "./StatCard";

const StatsCards = ({ total, open, closed, paused }) => {
  return (
    <div className="stats-grid">
      <StatCard title="Total Jobs" value={total} type="total" />
      <StatCard title="Open Jobs" value={open} type="open" />
      <StatCard title="Closed Jobs" value={closed} type="closed" />
      <StatCard title="Paused Jobs" value={paused} type="paused" />
    </div>
  );
};

export default StatsCards;
