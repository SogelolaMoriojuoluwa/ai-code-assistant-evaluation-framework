import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <div className="overlay">

        <div className="home-card shadow">

          <h1>
            AI Code Assistant Evaluation Framework
          </h1>

          <p className="lead mt-4">
            Design and Implementation of a Framework for Evaluating the Impact
            of AI Code Assistants (GitHub Copilot) on Code Quality and Delivery
            Speed in Web Development.
          </p>

          <div className="features">

            <div>✔ Code Quality Analysis</div>

            <div>✔ Delivery Speed Measurement</div>

            <div>✔ AI Evaluation Report</div>

            <div>✔ Developer Performance Dashboard</div>

          </div>

          <button
            className="btn btn-lg btn-primary mt-4"
            onClick={() => navigate("/register")}
          >
            Start Evaluation
          </button>

          <p className="version mt-4">
            Framework Version 1.0
          </p>

        </div>

      </div>

    </div>
  );
}