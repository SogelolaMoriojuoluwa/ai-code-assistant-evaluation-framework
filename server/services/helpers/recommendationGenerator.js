export const generateRecommendations = (metrics) => {
  return Object.values(metrics).flatMap(
    (metric) => metric.feedback
  );
};