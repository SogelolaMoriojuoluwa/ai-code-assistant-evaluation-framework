import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
|--------------------------------------------------------------------------
| Create Participant
|--------------------------------------------------------------------------
*/

export const createParticipant = async ({
  skillLevel,
  experienceYears,
}) => {

  // Generate the next sequential Participant ID
  const lastParticipant = await prisma.participant.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const nextNumber = lastParticipant
    ? lastParticipant.id + 1
    : 1;

  const participantId = `PT-${String(nextNumber).padStart(6, "0")}`;

  // Determine the least populated experiment group
  const groupA = await prisma.participant.count({
    where: {
      assignedGroup: "A",
    },
  });

  const groupB = await prisma.participant.count({
    where: {
      assignedGroup: "B",
    },
  });

  const groupC = await prisma.participant.count({
    where: {
      assignedGroup: "C",
    },
  });

  const groups = [
    { name: "A", count: groupA },
    { name: "B", count: groupB },
    { name: "C", count: groupC },
  ];

  const minimumCount = Math.min(
    ...groups.map((group) => group.count)
  );

  const candidateGroups = groups.filter(
    (group) => group.count === minimumCount
  );

  const assignedGroup =
    candidateGroups[
      Math.floor(Math.random() * candidateGroups.length)
    ].name;

  return await prisma.participant.create({
    data: {
      participantId,
      assignedGroup,
      skillLevel,
      experienceYears,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Get All Participants
|--------------------------------------------------------------------------
*/

export const getParticipants = async () => {
  return await prisma.participant.findMany({
    orderBy: {
      participantId: "asc",
    },
  });
};