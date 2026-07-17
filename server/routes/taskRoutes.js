import express from "express";
import { fetchTasks } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", fetchTasks);

export default router;