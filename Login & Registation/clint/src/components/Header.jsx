import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Navbar expand="lg" bg="danger" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          MySite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link style={{color:"white"}} as={Link} to="/home">
              User-Login
            </Nav.Link>
            <Nav.Link style={{color:"white"}} as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
