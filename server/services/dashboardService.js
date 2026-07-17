import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboard = async (experimentId) => {

    const experiment =
        await prisma.experiment.findUnique({
            where: {
                experimentId,
            },
            include: {
                participant: true,
                task: true,
                evaluation: true,
            },
        });

    if (!experiment) {
        throw new Error("Experiment not found.");
    }

    return {

        participant: {
            participantId:
                experiment.participant.participantId,

            assignedGroup:
                experiment.participant.assignedGroup,

            skillLevel:
                experiment.participant.skillLevel,

            experienceYears:
                experiment.participant.experienceYears,
        },

        experiment: {
            experimentId:
                experiment.experimentId,

            status:
                experiment.status,

            startedAt:
                experiment.startedAt,

            completedAt:
                experiment.completedAt,

            duration:
                experiment.duration,

            timeVariance:
                experiment.timeVariance,

            score:
                experiment.score,
        },

        task: {
            taskCode:
                experiment.task.taskCode,

            title:
                experiment.task.title,

            module:
                experiment.task.module,

            category:
                experiment.task.category,

            difficulty:
                experiment.task.difficulty,

            description:
                experiment.task.description,

            baselineTime:
                experiment.task.baselineTime,
        },

        evaluation:
    experiment.evaluation
        ? {
              overallScore:
                  experiment.evaluation.overallScore,

              quality:
                  experiment.evaluation.report.quality,

              metrics:
                  experiment.evaluation.report.metrics,

              recommendations:
                  experiment.evaluation.report.recommendations,

              report:
                  experiment.evaluation.report,
          }
        : null,

        summary: {
            completed:
                experiment.status === "COMPLETED",

            duration:
                experiment.duration,

            score:
                experiment.score,

            quality:
                experiment.evaluation?.report?.quality ??
                null,
        },
    };
};