import express from "express";

import {
  startExperimentController,
  submitExperimentController,
} from "../controllers/experimentController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Experiment routes working",
  });
});

router.put("/:experimentId/start", startExperimentController);

router.put("/:experimentId/submit", submitExperimentController);

export default router;