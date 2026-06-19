import { Container, Card, Row, Col, Badge } from 'react-bootstrap'

 function CaseStudies() {
  const cases = [
    { task: "REST API with Auth", human: "45min, 2 bugs", copilot: "28min, 1 bug", verdict: "37% faster", variant: "success" },
    { task: "React Todo App", human: "1.2h, CC=3.1", copilot: "0.7h, CC=4.8", verdict: "42% faster, +55% complexity", variant: "warning" },
    { task: "Data Parser", human: "30min, 0 bugs", copilot: "25min, 0 bugs", verdict: "Minimal gain", variant: "secondary" }
  ]

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Case Studies</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {cases.map((c, i) => (
          <Col key={i}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{c.task}</Card.Title>
                <div className="mt-3">
                  <p className="mb-1"><small className="text-muted">Human Only</small></p>
                  <p className="fw-semibold">{c.human}</p>
                  
                  <p className="mb-1"><small className="text-muted">Human + Copilot</small></p>
                  <p className="fw-semibold">{c.copilot}</p>
                  
                  <Badge bg={c.variant} className="mt-2">{c.verdict}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <p className="mt-4 text-muted small">*Pilot test data. Real data will come from Clinic submissions.</p>
    </Container>
  )
}

export default CaseStudies
