export const calculateOverallScore = (metrics) => {

  const weights = {
    maintainability: 0.25,
    complexity: 0.20,
    readability: 0.20,
    security: 0.20,
    lint: 0.15,
  };

  let total = 0;

  Object.entries(metrics).forEach(([key, metric]) => {
    total += metric.score * weights[key];
  });

  return Math.round(total);

};