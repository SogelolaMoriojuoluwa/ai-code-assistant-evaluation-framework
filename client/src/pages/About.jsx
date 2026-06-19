import { Container, Row, Col } from 'react-bootstrap'

 function About() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="fw-bold mb-4">About Copilot Clinic</h1>
          <div className="text-muted">
            <p>
              Copilot Clinic is a research tool built for my Computer Science final year project. 
              It tests the thesis: "How GitHub Copilot is Transforming Code Quality and Delivery Speed in Web Development".
            </p>
            <p>
              Developers submit solutions to coding tasks under 3 conditions: Human only, Human + Copilot, and AI-assisted review. 
              The platform analyzes code using ESLint, complexity metrics, and time tracking to produce a "Synergy Score".
            </p>
            <h3 className="mt-4 mb-3">Research Goal</h3>
            <p>
              Provide quantitative data on whether human expertise + AI actually improves code quality and speed, 
              or if it introduces new issues like higher complexity and technical debt.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About