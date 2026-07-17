import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getDashboard } from "../services/dashboardService";

import StatCard from "../component/dashboard/StatCard";
import MetricCard from "../component/dashboard/MetricCard";
import RecommendationCard from "../component/dashboard/RecommendationCard";

import "./styles/Dashboard.css";

export default function Dashboard() {
  const { experimentId } = useParams();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard(experimentId);
      setDashboard(data);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page d-flex justify-content-center align-items-center">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Dashboard not found.</div>
      </div>
    );
  }

  const { participant, experiment, task, evaluation } = dashboard;

  return (
    <div className="dashboard-page">
      <div className="dashboard-card shadow">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">
            AI Code Assistant Evaluation Framework
          </h2>

          <p className="text-muted fs-5">
            Evaluate the Impact of GitHub Copilot on Code Quality and Delivery
            Speed in Web Development
          </p>

          <span className="badge bg-success px-3 py-2">
            Framework Version 1.0
          </span>
        </div>

        {/* Participant */}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <i className="bi bi-person-fill me-2"></i>
            Participant Information
          </div>

          <div className="card-body">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr>
                  <th>Participant ID</th>
                  <td>{participant.participantId}</td>
                </tr>

                <tr>
                  <th>Assigned Group</th>
                  <td>{participant.assignedGroup}</td>
                </tr>

                <tr>
                  <th>Skill Level</th>
                  <td>{participant.skillLevel}</td>
                </tr>

                <tr>
                  <th>Experience</th>
                  <td>{participant.experienceYears} Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Task */}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-dark text-white">
            <i className="bi bi-journal-code me-2"></i>
            Task Information
          </div>

          <div className="card-body">
            <table className="table table-borderless mb-0">
              <tbody>
                <tr>
                  <th>Task Code</th>
                  <td>{task.taskCode}</td>
                </tr>

                <tr>
                  <th>Difficulty</th>
                  <td>{task.difficulty}</td>
                </tr>

                <tr>
                  <th>Baseline Time</th>
                  <td>{task.baselineTime} mins</td>
                </tr>
                <tr>
    <th>Title</th>
    <td>{task.title}</td>
</tr>

<tr>
    <th>Module</th>
    <td>{task.module}</td>
</tr>

<tr>
    <th>Category</th>
    <td>{task.category}</td>
</tr>

<tr>
    <th>Description</th>
    <td>{task.description}</td>
</tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}

        <h5 className="section-title">Experiment Summary</h5>
        <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">

  <div>
    <strong>Experiment ID:</strong> {experiment.experimentId}
  </div>

  <div>
    <span className="badge bg-success fs-6">
      {experiment.status}
    </span>
  </div>

</div>

        <div className="row">
          <StatCard
            title="Overall Score"
            value={experiment.score}
            icon="bi bi-award-fill"
            color="success"
          />

          <StatCard
            title="Duration"
            value={`${experiment.duration} mins`}
            icon="bi bi-clock-fill"
            color="primary"
          />

          <StatCard
            title="Time Variance"
            value={`${experiment.timeVariance} mins`}
            icon="bi bi-graph-up-arrow"
            color="warning"
          />

          <StatCard
            title="Quality"
            value={evaluation?.quality || "N/A"}
            icon="bi bi-star-fill"
            color="info"
          />
        </div>

        {/* Metrics */}

        <h5 className="section-title">Code Quality Metrics</h5>

        <div className="row">
          <MetricCard
            title="Maintainability"
            score={evaluation?.metrics?.maintainability?.score ?? "-"}
          />

          <MetricCard
            title="Complexity"
            score={evaluation?.metrics?.complexity?.score ?? "-"}
          />

          <MetricCard
            title="Readability"
            score={evaluation?.metrics?.readability?.score ?? "-"}
          />

          <MetricCard
            title="Security"
            score={evaluation?.metrics?.security?.score ?? "-"}
          />

          <MetricCard
            title="ESLint"
            score={evaluation?.metrics?.lint?.score ?? "-"}
          />
        </div>

        {/* Recommendations */}

        <RecommendationCard
          recommendations={evaluation?.recommendations ?? []}
        />

        {/* Buttons */}

        <div className="d-flex justify-content-center gap-3 mt-5">
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="bi bi-file-earmark-pdf-fill me-2"></i>
            Export Report
          </button>

          <button className="btn btn-success" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-repeat me-2"></i>
            New Evaluation
          </button>
        </div>
       <hr />

<div className="text-center text-muted small">

    <strong>
        AI Code Assistant Evaluation Framework
    </strong>

    <br />

    Design and Implementation of a Framework for Evaluating the
    Impact of AI Code Assistants (GitHub Copilot) on Code Quality
    and Delivery Speed in Web Development.

    <br /><br />

    © 2026 Final Year Project

</div>
      </div>

      
    </div>

  );
}
