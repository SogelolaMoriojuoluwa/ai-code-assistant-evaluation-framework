import express from "express";

import {
  registerParticipant,
  fetchParticipants,
} from "../controllers/participantController.js";

const router = express.Router();

router.post("/", registerParticipant);

router.get("/", fetchParticipants);

export default router;