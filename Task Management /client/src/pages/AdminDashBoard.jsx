import { Link, Outlet, useNavigate } from "react-router-dom";
import { 
  Container, 
  Navbar, 
  Nav, 
  Button, 
  Card, 
  Row, 
  Col,
  Dropdown 
} from 'react-bootstrap';
import { 
  FaUserPlus, 
  FaTasks, 
  FaSignOutAlt, 
  FaUserCircle,
  FaBars,
  FaHome
} from 'react-icons/fa';
import '../css/AdminDashboard.css'; 

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <FaHome className="me-2" />
            <span>Admin Portal</span>
          </Navbar.Brand>
          
          <div className="ms-auto d-flex align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-user" className="d-flex align-items-center">
                <FaUserCircle className="me-2" size={20} />
                <span>{localStorage.getItem("adminuser")}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item onClick={logout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <Container fluid className="admin-content">
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="admin-sidebar px-0">
            <Card className="h-100 rounded-0 border-0 shadow-sm">
              <Card.Body className="p-0">
                <Nav defaultActiveKey="/createuser" className="flex-column">
                  <Nav.Link 
                    as={Link} 
                    to="createuser" 
                    className="admin-menu-item"
                  >
                    <FaUserPlus className="me-2" />
                    Create User
                  </Nav.Link>
                  
                  <Nav.Link 
                    as={Link} 
                    to="assigntask" 
                    className="admin-menu-item"
                  >
                    <FaTasks className="me-2" />
                    Assign Task
                  </Nav.Link>



                    <Nav.Link 
                    as={Link} 
                    to="taskdetail" 
                    className="admin-menu-item"
                  >
                    <FaTasks className="me-2" />
                    TaskDetail
                  </Nav.Link>


                  



                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="admin-main-content py-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <Outlet />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard;