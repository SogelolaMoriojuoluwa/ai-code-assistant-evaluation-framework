import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
|--------------------------------------------------------------------------
| Create Experiment
|--------------------------------------------------------------------------
*/

export const createExperiment = async (participantId) => {

  /*
  |--------------------------------------------------------------------------
  | Assign Task Sequentially
  |--------------------------------------------------------------------------
  */

  // Get all active tasks
  const tasks = await prisma.task.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      taskCode: "asc",
    },
  });

  if (tasks.length === 0) {
    throw new Error("No active task found.");
  }

  // Get the last experiment
  const lastExperiment = await prisma.experiment.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  // Determine next task
  let taskIndex = 0;

  if (lastExperiment) {
    taskIndex = lastExperiment.id % tasks.length;
  }

  const task = tasks[taskIndex];

  /*
  |--------------------------------------------------------------------------
  | Generate Experiment ID
  |--------------------------------------------------------------------------
  */

  const nextNumber = lastExperiment
    ? lastExperiment.id + 1
    : 1;

  const experimentId = `EXP-${String(nextNumber).padStart(
    6,
    "0"
  )}`;

  /*
  |--------------------------------------------------------------------------
  | Create Experiment
  |--------------------------------------------------------------------------
  */

  return await prisma.experiment.create({
    data: {
      experimentId,
      participantId,
      taskId: task.id,
    },

    include: {
      participant: {
        select: {
          participantId: true,
          assignedGroup: true,
          skillLevel: true,
          experienceYears: true,
        },
      },

      task: {
        select: {
          taskCode: true,
          title: true,
          difficulty: true,
          baselineTime: true,
        },
      },
    },
  });
};
/*
|--------------------------------------------------------------------------
| Start Experiment
|--------------------------------------------------------------------------
*/

export const startExperiment = async (experimentId) => {
  const experiment = await prisma.experiment.findUnique({
    where: {
      experimentId,
    },
  });

  if (!experiment) {
    throw new Error("Experiment not found.");
  }

  if (experiment.status === "IN_PROGRESS") {
    throw new Error("Experiment has already started.");
  }

  if (experiment.status === "COMPLETED") {
    throw new Error("Experiment has already been completed.");
  }

  return await prisma.experiment.update({
    where: {
      experimentId,
    },
    data: {
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
    include: {
      participant: true,
      task: true,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Submit Experiment
|--------------------------------------------------------------------------
*/

export const submitExperiment = async (experimentId) => {
  const experiment = await prisma.experiment.findUnique({
    where: {
      experimentId,
    },
    include: {
      task: true,
    },
  });

  if (!experiment) {
    throw new Error("Experiment not found.");
  }

  if (experiment.status !== "IN_PROGRESS") {
    throw new Error(
      "Only experiments in progress can be submitted."
    );
  }

  if (!experiment.startedAt) {
    throw new Error(
      "Experiment start time is missing."
    );
  }

  const completedAt = new Date();

  const duration = Math.ceil(
    (completedAt.getTime() - experiment.startedAt.getTime()) /
      60000
  );

  const timeVariance =
    duration - experiment.task.baselineTime;

  return await prisma.experiment.update({
    where: {
      experimentId,
    },
    data: {
      completedAt,
      duration,
      timeVariance,
      submissionStatus: true,
      status: "COMPLETED",
    },
    include: {
      participant: true,
      task: true,
      evaluation: true,
    },
  });
};