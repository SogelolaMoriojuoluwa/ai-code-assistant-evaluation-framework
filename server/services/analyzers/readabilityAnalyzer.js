export const analyzeReadability = (code) => {
  let score = 100;
  const feedback = [];

  // Empty code
  if (!code || code.trim().length === 0) {
    return {
      score: 0,
      feedback: ["No code submitted."],
    };
  }

  // Long lines
  const lines = code.split("\n");

  const longLines = lines.filter(
    (line) => line.length > 100
  ).length;

  if (longLines > 0) {
    score -= Math.min(longLines * 2, 20);

    feedback.push(
      `${longLines} line(s) exceed 100 characters.`
    );
  }

  // Poor variable names
  const poorNames = code.match(/\b[a-zA-Z]\b/g);

  if (poorNames) {
    score -= Math.min(poorNames.length * 2, 20);

    feedback.push(
      "Avoid single-letter variable names."
    );
  }

  // Missing comments

  if (!code.includes("//") && !code.includes("/*")) {
    score -= 10;

    feedback.push(
      "Consider adding comments."
    );
  }

  // No blank lines

  const blankLines = lines.filter(
    (line) => line.trim() === ""
  ).length;

  if (blankLines === 0 && lines.length > 20) {
    score -= 5;

    feedback.push(
      "Improve spacing between code blocks."
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