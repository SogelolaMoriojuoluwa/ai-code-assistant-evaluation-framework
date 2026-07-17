import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import participantRoutes from "./routes/participantRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import experimentRoutes from "./routes/experimentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Code Assistant Evaluation Framework API"
    });
});

app.use("/api/tasks", taskRoutes);

app.use("/api/participants", participantRoutes);

app.use("/api/experiments", experimentRoutes);
app.use("/api/dashboard", dashboardRoutes);



app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});