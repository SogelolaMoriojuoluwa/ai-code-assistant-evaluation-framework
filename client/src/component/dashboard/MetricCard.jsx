export default function MetricCard({
  title,
  score = 0,
}) {
  const value = Number(score) || 0;

  let color = "bg-success";

  if (value < 80) color = "bg-warning";
  if (value < 60) color = "bg-danger";

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-1">
        <strong>{title}</strong>
        <strong>{value}%</strong>
      </div>

      <div className="progress" style={{ height: "12px" }}>
        <div
          className={`progress-bar ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}