import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header=()=>{

 <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/home">Home</Nav.Link>
            <Nav.Link as={Link} href="/insert">Insert</Nav.Link>
            <Nav.Link as={Link} href="/Display">Display</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

}



export default Header;