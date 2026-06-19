import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <BSNavbar expand="lg" bg="white" className="shadow-sm sticky-top">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Copilot Clinic
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cases">
              Case Studies
            </Nav.Link>

            <Nav.Link as={NavLink} to="/clinic">
              Clinic
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default NavBar