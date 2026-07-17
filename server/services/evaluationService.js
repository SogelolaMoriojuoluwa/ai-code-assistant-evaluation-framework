import { PrismaClient } from "@prisma/client";

import { analyzeMaintainability } from "./analyzers/maintainabilityAnalyzer.js";
import { analyzeComplexity } from "./analyzers/complexityAnalyzer.js";
import { analyzeReadability } from "./analyzers/readabilityAnalyzer.js";
import { analyzeSecurity } from "./analyzers/securityAnalyzer.js";
import { analyzeLint } from "./analyzers/lintAnalyzer.js";

import { calculateOverallScore } from "./helpers/scoreCalculator.js";
import { getQualityRating } from "./helpers/qualityRating.js";
import { generateRecommendations } from "./helpers/recommendationGenerator.js";

const prisma = new PrismaClient();

export const evaluateCode = async (
  experimentId,
  submittedCode
) => {

  // Find experiment
  const experiment = await prisma.experiment.findUnique({
    where: {
      experimentId,
    },
  });

  if (!experiment) {
    throw new Error("Experiment not found.");
  }

  // Ensure experiment has been completed
  if (experiment.status !== "COMPLETED") {
    throw new Error(
      "Experiment must be completed before evaluation."
    );
  }

  // Prevent duplicate evaluations
  const existingEvaluation =
    await prisma.evaluation.findUnique({
      where: {
        experimentId: experiment.id,
      },
    });

  if (existingEvaluation) {
    throw new Error(
      "This experiment has already been evaluated."
    );
  }

  // Run analyzers
  const metrics = {
    maintainability:
      analyzeMaintainability(submittedCode),

    complexity:
      analyzeComplexity(submittedCode),

    readability:
      analyzeReadability(submittedCode),

    security:
      analyzeSecurity(submittedCode),

    lint:
      await analyzeLint(submittedCode),
  };

  // Calculate score
  const overallScore =
    calculateOverallScore(metrics);

  // Determine quality rating
  const quality =
    getQualityRating(overallScore);

  // Generate recommendations
  const recommendations =
    generateRecommendations(metrics);

  // Build report
  const report = {
    frameworkVersion: "1.0",

    evaluationDate:
      new Date(),

    overallScore,

    quality,

    metrics,

    recommendations,
  };

  // Save evaluation
  const evaluation =
    await prisma.evaluation.create({
      data: {
        experimentId: experiment.id,
        submittedCode,
        overallScore,
        report,
      },
    });

  // Update experiment score
  const updatedExperiment =
    await prisma.experiment.update({
      where: {
        experimentId,
      },
      data: {
        score: overallScore,
      },
    });

  return {
    experiment: updatedExperiment,
    evaluation,
    overallScore,
    quality,
    recommendations,
    report,
  };
};