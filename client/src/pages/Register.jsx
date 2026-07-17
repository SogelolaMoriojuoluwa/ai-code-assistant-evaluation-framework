import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerParticipant } from "../services/participantService";

import "./styles/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skillLevel: "BEGINNER",
    experienceYears: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]:
      name === "experienceYears"
        ? value === ""
          ? ""
          : Number(value)
        : value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await registerParticipant({
        ...formData,
        experienceYears: formData.experienceYears
            ? Number(formData.experienceYears)
            : null,
});

    localStorage.setItem(
        "experiment",
        JSON.stringify(result.experiment)
);

      navigate(`/experiment/${result.experiment.experimentId}`,
        {
    state: {
      experiment: result.experiment,
    },
  }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to register participant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card shadow">

        <h2 className="text-center mb-2">
          AI Code Assistant Evaluation Framework
        </h2>

        <p className="text-center text-muted mb-4">
          GitHub Copilot Evaluation Platform
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Programming Skill
            </label>

            <select
              className="form-select"
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
            >
              <option value="BEGINNER">
                Beginner
              </option>

              <option value="INTERMEDIATE">
                Intermediate
              </option>

              <option value="EXPERT">
                Expert
              </option>

            </select>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Years of Experience
            </label>

            <input
              type="number"
              className="form-control"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              min="0"
              placeholder="Enter years of experience"
            />

          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >

            {loading
              ? "Registering..."
              : "Register & Continue"}

          </button>

        </form>

      </div>

    </div>
  );
}