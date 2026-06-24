import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  ProgressBar,
  Badge,
} from "react-bootstrap";

export default function Clinic() {
  const [mode, setMode] = useState("human");
  const [code, setCode] = useState("");
  const [task, setTask] = useState("REST API with Auth");
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const startTask = () => {
    setStartTime(Date.now());
    setElapsed(0);
    setIsRunning(true);
    setResult(null);
    setCode("");
  };

  const resetTask = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsed(0);
    setCode("");
    setResult(null);
  };

  const submitCode = async () => {
    if (!code.trim()) {
      alert("Please paste your code first");
      return;
    }

    setIsRunning(false);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/refactor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze code");
      }

      const lines = code.split("\n").length;

      const functions =
        (code.match(
          /function\s+\w+|=>|class\s+\w+|const\s+\w+\s*=\s*\(/g
        ) || []).length;

      const complexity = Math.min(
        10,
        Math.max(1, Math.floor(functions * 0.8))
      );

      const score = Math.max(
        50,
        100 - complexity * 4 - Math.floor(elapsed / 30)
      );

      setResult({
        mode: mode === "human" ? "Human Only" : "Human + Copilot",
        time: formatTime(elapsed),
        lines,
        functions,
        complexity,
        bugs: 0,
        score,
        refactoredCode: data.refactoredCode,
        timeSaved: data.timeSaved || 0,
      });
    } catch (error) {
      console.error(error);

      alert(
        error.message || "Failed to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!result?.refactoredCode) return;

    try {
      await navigator.clipboard.writeText(
        result.refactoredCode
      );

      alert("Code copied successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy code.");
    }
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Copilot Clinic Lab</h1>

      <p className="text-muted mb-4">
        Complete a coding task in two modes and compare
        productivity with AI assistance.
      </p>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Select Task</Form.Label>

                <Form.Select
                  value={task}
                  onChange={(e) =>
                    setTask(e.target.value)
                  }
                  disabled={isRunning}
                >
                  <option>
                    REST API with Auth
                  </option>
                  <option>
                    React Todo App
                  </option>
                  <option>Data Parser</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Mode</Form.Label>

                <Form.Select
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value)
                  }
                  disabled={isRunning}
                >
                  <option value="human">
                    Human Only
                  </option>
                  <option value="copilot">
                    Human + Copilot
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <div className="mb-3">
                <Form.Label>Timer</Form.Label>

                <h3 className="text-primary">
                  {formatTime(elapsed)}
                </h3>
              </div>
            </Col>
          </Row>

          <div className="d-flex gap-2 mb-3">
            {!isRunning && !result && (
              <Button
                variant="success"
                onClick={startTask}
              >
                Start Task
              </Button>
            )}

            {isRunning && (
              <Button
                variant="primary"
                onClick={submitCode}
              >
                Submit Code
              </Button>
            )}

            {(result || isRunning) && (
              <Button
                variant="outline-secondary"
                onClick={resetTask}
              >
                Reset
              </Button>
            )}
          </div>

          {isRunning && (
            <Alert variant="info">
              Task running... Complete the task in
              your IDE, paste the code below, then
              submit for analysis.
            </Alert>
          )}

          <Form.Group>
            <Form.Label>
              Paste Your Solution Code
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={12}
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              placeholder="// Paste your code here..."
              disabled={!isRunning}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {loading && (
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <p className="mb-2">
              Analyzing code with AI...
            </p>

            <ProgressBar animated now={100} />
          </Card.Body>
        </Card>
      )}

      {result && (
        <>
          <Card className="shadow-sm border-primary mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                Analysis Results - {result.mode}
              </h5>
            </Card.Header>

            <Card.Body>
              <Row className="text-center">
                <Col xs={6} md={3}>
                  <p className="text-muted">
                    Time Taken
                  </p>
                  <h4>{result.time}</h4>
                </Col>

                <Col xs={6} md={3}>
                  <p className="text-muted">
                    Lines of Code
                  </p>
                  <h4>{result.lines}</h4>
                </Col>

                <Col xs={6} md={3}>
                  <p className="text-muted">
                    Complexity
                  </p>
                  <h4>
                    {result.complexity}/10
                  </h4>
                </Col>

                <Col xs={6} md={3}>
                  <p className="text-muted">
                    Time Saved
                  </p>
                  <h4>
                    {result.timeSaved} min
                  </h4>
                </Col>
              </Row>

              <hr />

              <div className="text-center">
                <p>Synergy Score</p>

                <h1 className="display-4 text-primary">
                  {result.score}
                </h1>

                <Badge
                  bg={
                    result.score > 75
                      ? "success"
                      : result.score > 50
                      ? "warning"
                      : "danger"
                  }
                >
                  {result.score > 75
                    ? "Excellent"
                    : result.score > 50
                    ? "Good"
                    : "Needs Work"}
                </Badge>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                AI Refactored Code
              </h5>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={copyCode}
              >
                Copy Code
              </Button>
            </Card.Header>

            <Card.Body>
              <pre
                style={{
                  maxHeight: "500px",
                  overflow: "auto",
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <code>
                  {result.refactoredCode}
                </code>
              </pre>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}