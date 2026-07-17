export default function RecommendationCard({
  recommendations = [],
}) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header fw-bold">
        Recommendations
      </div>

      <div className="card-body">
        {recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <div
              key={index}
              className="mb-2"
            >
              <i className="bi bi-check-circle-fill text-success me-2"></i>

              {item}
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}