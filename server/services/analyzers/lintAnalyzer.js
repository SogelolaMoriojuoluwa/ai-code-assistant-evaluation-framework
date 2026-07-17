import { ESLint } from "eslint";

const eslint = new ESLint({
  fix: false,
});

export const analyzeLint = async (code) => {
  try {
    const results = await eslint.lintText(code);

    const result = results[0];

    let score = 100;
    const feedback = [];

    result.messages.forEach((message) => {
      feedback.push(
        `Line ${message.line}: ${message.message}`
      );

      if (message.severity === 2) {
        score -= 10;
      } else {
        score -= 5;
      }
    });

    if (feedback.length === 0) {
      feedback.push("No lint issues detected.");
    }

    if (score < 0) {
      score = 0;
    }

    return {
      score,
      feedback,
    };

  } catch (error) {

    return {
      score: 0,
      feedback: [
        `ESLint Error: ${error.message}`
      ],
    };

  }
};