import { evaluateCode } from "../services/evaluationService.js";

export const evaluateCodeController = async (req, res) => {
  try {
    const { experimentId } = req.params;
    const { submittedCode } = req.body;

    if (!submittedCode) {
      return res.status(400).json({
        success: false,
        message: "Submitted code is required.",
      });
    }

    const evaluation = await evaluateCode(
      experimentId,
      submittedCode
    );

    res.status(201).json({
      success: true,
      message: "Code evaluated successfully.",
      data: evaluation,
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};