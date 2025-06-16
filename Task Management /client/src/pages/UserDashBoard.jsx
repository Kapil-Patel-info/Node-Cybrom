import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../css/UserDashBoard.css"

const UserDashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <header className="user-header text-white bg-primary py-3 text-center shadow-sm">
        <h1 className="mb-0">User Dashboard</h1>
      </header>

      <div className="user-info bg-light d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
        <div className="fs-5">Welcome: <strong>{localStorage.getItem("username")}</strong></div>
        <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
      </div>

      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>User</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="mytask">My Task</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <main className="p-4 bg-body-secondary min-vh-100">
        <Outlet />
      </main>
    </>
  )
}

export default UserDashBoard;
