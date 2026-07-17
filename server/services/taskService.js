import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getActiveTasks = async () => {
  return await prisma.task.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      taskCode: true,
      title: true,
      module: true,
      category: true,
      description: true,
      difficulty: true,
      baselineTime: true,
      maxScore: true,

    },
    orderBy: {
      taskCode: "asc",
    },
  });
};