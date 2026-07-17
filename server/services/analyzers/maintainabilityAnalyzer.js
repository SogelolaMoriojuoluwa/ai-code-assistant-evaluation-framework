export const analyzeMaintainability = (code) => {
  let score = 100;
  const feedback = [];

  if (!code || code.trim() === "") {
    return {
      score: 0,
      feedback: ["No code submitted."],
    };
  }

  const lines = code.split("\n");

  if (lines.length > 200) {
    score -= 20;

    feedback.push(
      "Large files are harder to maintain."
    );
  }

  const functions =
    code.match(/function\s+\w+|=>/g)?.length || 0;

  if (functions > 10) {
    score -= 10;

    feedback.push(
      "Consider splitting functionality into smaller modules."
    );
  }

  if (feedback.length === 0) {
  feedback.push("No issues detected.");
}

return {
  score,
  feedback,
};
};