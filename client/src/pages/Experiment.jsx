import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  startExperiment,
  submitExperiment,
} from "../services/experimentService";

import Timer from "../component/experiment/Timer";
import CodeEditor from "../component/experiment/codeEditor";

import "./styles/Experiment.css";

export default function Experiment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const experiment = state?.experiment;

  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [code, setCode] = useState("");

  if (!experiment) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Experiment data not found.
        </div>
      </div>
    );
  }

  const group = experiment.participant.assignedGroup;

  let groupTitle = "";
  let instructions = [];

  switch (group) {
    case "A":
      groupTitle = "Group A - Human Only";

      instructions = [
        "Complete this task without using GitHub Copilot or any AI code assistant.",
        "Write every line of code manually.",
        "Your delivery speed and code quality will be evaluated.",
        "Submit your solution once you have completed the task.",
      ];
      break;

    case "B":
      groupTitle = "Group B - AI-Assisted (GitHub Copilot)";

      instructions = [
        "Use GitHub Copilot while completing this programming task.",
        "You may accept, modify or reject AI suggestions.",
        "Your delivery speed and code quality will be evaluated.",
        "Review all generated code before submission.",
      ];
      break;

    case "C":
      groupTitle = "Group C - AI-Dominant";

      instructions = [
        "Complete this task primarily using GitHub Copilot.",
        "Allow AI to generate most of the implementation.",
        "Review the generated code before submitting.",
        "Your delivery speed and code quality will be evaluated.",
      ];
      break;

    default:
      groupTitle = "Experiment";

      instructions = [
        "Complete the assigned programming task.",
      ];
  }

  const handleStart = async () => {
    try {
      setLoading(true);

      await startExperiment(experiment.experimentId);

      setRunning(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to start experiment."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please write or paste your code.");
      return;
    }

    try {
      setLoading(true);

      await submitExperiment(
        experiment.experimentId,
        code
      );

      navigate(
        `/dashboard/${experiment.experimentId}`
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to submit experiment."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="experiment-page">

      <div className="experiment-card shadow">

        <h2 className="text-center mb-4">
          AI Code Assistant Evaluation Framework
        </h2>

        {/* Experiment Information */}

        <div className="info-card mb-4">

          <h5>Experiment Information</h5>

          <hr />

          <p>
            <strong>Experiment ID:</strong>{" "}
            {experiment.experimentId}
          </p>

          <p>
            <strong>Participant ID:</strong>{" "}
            {experiment.participant.participantId}
          </p>

          <p>
            <strong>Task Code:</strong>{" "}
            {experiment.task.taskCode}
          </p>

          <p>
            <strong>Task:</strong>{" "}
            {experiment.task.title}
          </p>

          <p>
            <strong>Difficulty:</strong>{" "}
            {experiment.task.difficulty}
          </p>

          <p>
            <strong>Baseline Time:</strong>{" "}
            {experiment.task.baselineTime} mins
          </p>

        </div>

        {/* Experiment Instructions */}

        <div className="card shadow-sm mb-4">

          <div className="card-header bg-primary text-white">

            <h5 className="mb-0">
              Experiment Instructions
            </h5>

          </div>

          <div className="card-body">

            <h4 className="fw-bold  mb-3">
              <span className="badge bg-primary fs-6 px-3 py-2">
    {groupTitle}
</span>
            </h4>

            <p>
              Please read the following instructions carefully before starting the experiment.
            </p>

            <ul>
              {instructions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="form-check mt-4">

              <input
                className="form-check-input"
                type="checkbox"
                id="accept"
                checked={accepted}
                onChange={(e) =>
                  setAccepted(e.target.checked)
                }
              />

              <label
                className="form-check-label"
                htmlFor="accept"
              >
                I have read and understood the assigned experiment instructions and agree to follow them throughout this experiment.
              </label>

            </div>

          </div>

        </div>

        {/* Start Button */}

        <button
          className="btn btn-success mb-4"
          disabled={!accepted || running || loading}
          onClick={handleStart}
        >
          {loading
            ? "Starting..."
            : "Start Experiment"}
        </button>

        {/* Timer */}

        <Timer running={running} />

        {/* Code Editor */}

        <div className="mt-4">

          <CodeEditor
            code={code}
            setCode={setCode}
            disabled={!running}
          />

        </div>

        {/* Submit */}

        <button
          className="btn btn-primary submit-btn w-100 mt-4"
          disabled={!running || loading}
          onClick={handleSubmit}
        >
          {loading
            ? "Submitting..."
            : "Submit Evaluation"}
        </button>

      </div>

    </div>
  );
}