import { getActiveTasks } from "../services/taskService.js";

export const fetchTasks = async (req, res) => {
  try {
    const tasks = await getActiveTasks();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
    });
  }
};