import { Container, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

 function Home() {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold mb-4">Measure Human + AI Synergy</h1>
          <p className="lead text-muted mb-4">
            Copilot Clinic benchmarks code quality and delivery speed with vs without GitHub Copilot. 
            Built for my FYP on AI-assisted web development.
          </p>
          <Button as={Link} to="/clinic" variant="primary" size="lg">
            Try the Clinic
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home