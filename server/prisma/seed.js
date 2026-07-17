import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tasks = [
    {
      taskCode: "T001",
      title: "React Login Component",
      module: "React Components",
      category: "Frontend",
      difficulty: "EASY",
      description: "Create a reusable login component using React.",
      baselineTime: 15,
      maxScore: 100,
      isActive: true,
    },
    {
      taskCode: "T002",
      title: "Registration Form",
      module: "React Components",
      category: "Frontend",
      difficulty: "EASY",
      description: "Create a registration form with validation.",
      baselineTime: 20,
      maxScore: 100,
      isActive: true,
    },
    {
      taskCode: "T003",
      title: "CRUD Product API",
      module: "React Components",
      category: "Backend",
      difficulty: "MEDIUM",
      description: "Develop a RESTful CRUD API for products.",
      baselineTime: 30,
      maxScore: 100,
      isActive: true,
    },
    {
      taskCode: "T004",
      title: "Authentication API",
      module: "React Components",
      category: "Backend",
      difficulty: "HARD",
      description: "Implement JWT authentication.",
      baselineTime: 45,
      maxScore: 100,
      isActive: true,
    },
    {
      taskCode: "T005",
      title: "API Integration",
      module: "React Components",
      category: "API",
      difficulty: "MEDIUM",
      description: "Consume an external REST API.",
      baselineTime: 25,
      maxScore: 100,
      isActive: true,
    },
    {
      taskCode: "T006",
      title: "JWT Middleware",
      module: "React Components",
      category: "Authentication",
      difficulty: "HARD",
      description: "Protect routes using JWT middleware.",
      baselineTime: 40,
      maxScore: 100,
      isActive: true,
    },
  ];

  for (const task of tasks) {
    await prisma.task.upsert({
      where: {
        taskCode: task.taskCode,
      },
      update: {},
      create: task,
    });
  }

  console.log("✅ Tasks seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });