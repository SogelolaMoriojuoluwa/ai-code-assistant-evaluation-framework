import { evaluateCode } from "../services/evaluationService.js";
import {
  startExperiment,
  submitExperiment,
} from "../services/experimentService.js";

export const startExperimentController = async (req, res) => {
  try {
    const { experimentId } = req.params;

    const experiment = await startExperiment(experimentId);

    res.status(200).json({
      success: true,
      message: "Experiment started successfully.",
      data: experiment,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const submitExperimentController = async (req, res) => {
  try {

    const { experimentId } = req.params;
    const { submittedCode } = req.body;

    if (!submittedCode) {
      return res.status(400).json({
        success: false,
        message: "Submitted code is required.",
      });
    }

    // Finish experiment
    const experiment =
      await submitExperiment(experimentId);

    // Evaluate code
    const evaluation =
      await evaluateCode(
        experimentId,
        submittedCode
      );

    res.status(200).json({
      success: true,
      message:
        "Experiment submitted and evaluated successfully.",
      data: {
        experiment,
        evaluation,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};