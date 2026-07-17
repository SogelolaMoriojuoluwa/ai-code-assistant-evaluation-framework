export const analyzeSecurity = (code) => {
  let score = 100;
  const feedback = [];

  if (!code || code.trim() === "") {
    return {
      score: 0,
      feedback: ["No code submitted."],
    };
  }

  const riskyPatterns = [
    "eval(",
    "innerHTML",
    "document.write",
    "password =",
    "apiKey",
    "secret",
    "token =",
  ];

  riskyPatterns.forEach((pattern) => {
    if (code.includes(pattern)) {
      score -= 15;

      feedback.push(
        `Potential security issue detected: ${pattern}`
      );
    }
  });

  if (feedback.length === 0) {
  feedback.push("No issues detected.");
}

return {
  score,
  feedback,
};
};