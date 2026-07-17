import {
  createParticipant,
  getParticipants,
} from "../services/participantService.js";

import { createExperiment } from "../services/experimentService.js";

export const registerParticipant = async (req, res) => {
  try {
    const { skillLevel, experienceYears } = req.body;

    if (!skillLevel) {
      return res.status(400).json({
        success: false,
        message: "Skill Level is required.",
      });
    }

    // Create participant
    const participant = await createParticipant({
      skillLevel,
      experienceYears,
    });

    // Automatically create experiment
    const experiment = await createExperiment(participant.id);

    res.status(201).json({
      success: true,
      message: "Participant registered successfully.",
      data: {
        participant,
        experiment,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchParticipants = async (req, res) => {
  try {
    const participants = await getParticipants();

    res.status(200).json({
      success: true,
      count: participants.length,
      data: participants,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch participants.",
    });
  }
};