export default function StatCard({
  title,
  value,
  icon,
  color = "primary",
}) {
  return (
    <div className="col-md-3 mb-4">
      <div className={`card border-0 shadow h-100`}>

        <div className="card-body text-center">

          <i
            className={`${icon} text-${color}`}
            style={{
              fontSize: "32px",
            }}
          ></i>

          <h6 className="mt-3">
            {title}
          </h6>

          <h3 className={`text-${color}`}>
            {value}
          </h3>

        </div>

      </div>
    </div>
  );
}