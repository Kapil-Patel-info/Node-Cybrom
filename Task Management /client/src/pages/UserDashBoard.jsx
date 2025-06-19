import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../css/UserDashBoard.css";
import Footer from '../components/Footer';

const UserDashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (<>
    <div className="user-dashboard">
      {/* User Header */}
      <header className="user-header bg-primary text-white">
        <Container className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <div className="user-avatar me-3">
              <span className="initials">
                {localStorage.getItem("username")?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h5 className="mb-0">Welcome back,</h5>
              <h4 className="mb-0 fw-bold">{localStorage.getItem("username")}</h4>
            </div>
          </div>
          <button 
            className="btn btn-light btn-logout d-flex align-items-center"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </Container>
      </header>

      {/* Navigation */}
      <Navbar expand="lg" className="main-navbar shadow-sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="mytask" 
                className="nav-link"
              >
                <i className="bi bi-list-task me-2"></i>
                My Tasks
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="changepassword" 
                className="nav-link"
              >
                <i className="bi bi-shield-lock me-2"></i>
                Change Password
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="main-content">
        <Container>
          <div className="content-container">
            <Outlet />
          </div>
        </Container>
      </main>
    </div>

<Footer/>
    </>
  )
}

export default UserDashBoard;