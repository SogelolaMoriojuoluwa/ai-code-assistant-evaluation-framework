export const analyzeComplexity = (code) => {
  let score = 100;
  const feedback = [];

  if (!code || code.trim() === "") {
    return {
      score: 0,
      feedback: ["No code submitted."],
    };
  }

  const keywords = [
    "if",
    "else",
    "switch",
    "case",
    "for",
    "while",
    "do",
    "catch",
  ];

  let complexity = 0;

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    const matches = code.match(regex);

    if (matches) {
      complexity += matches.length;
    }
  });

  if (complexity > 5) {
    score -= (complexity - 5) * 3;

    feedback.push(
      "Reduce unnecessary conditional statements and loops."
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