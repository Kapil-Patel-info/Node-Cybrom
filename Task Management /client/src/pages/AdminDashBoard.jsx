import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
  Badge
} from 'react-bootstrap';
import {
  FaUserPlus,
  FaTasks,
  FaSignOutAlt,
  FaUserCircle,
  FaHome,
  FaBell,
  FaChartLine,
  FaCog,
  FaUsers,
  FaDatabase
} from 'react-icons/fa';
import '../css/AdminDashboard.css';
import BackEndUrl from "../config/BackendUrl";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [data, setData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [reload, setReload] = useState(false); 
  const loadUsers = async () => {
    try {
      const response = await axios.get(`${BackEndUrl}/admin/showuserdata`);
      setData(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const loadData = async () => {
    try {
      const api = `${BackEndUrl}/admin/taskdetail`;
      const response = await axios.get(api);
      setMyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadData();
  }, [reload]); 

  const handleTaskCompleted = async (taskId) => {
    try {
      await axios.post(`${BackEndUrl}/admin/completetask`, { id: taskId });
      setReload(prev => !prev); 
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return ( <>
    <div className="admin-dashboard">
      <Navbar bg="white" variant="light" expand="lg" className="admin-navbar border-bottom">
        <Container fluid className="px-4">
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <div className="brand-logo me-2 d-flex align-items-center justify-content-center">
              <FaHome className="text-primary" />
            </div>
            <span className="fw-bold text-primary">AdminPortal</span>
          </Navbar.Brand>

          <div className="ms-auto d-flex align-items-center">
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle variant="light" id="dropdown-notifications" className="position-relative">
                <FaBell className="text-muted" />
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  3
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm dropdown-menu-end p-0" style={{ width: "320px" }}>
                <Dropdown.Header className="bg-light fw-bold">Notifications</Dropdown.Header>
                <Dropdown.Divider className="m-0" />
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <Dropdown.Item className="py-3 border-bottom">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                          <FaUserPlus size={14} />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="small text-muted">2 mins ago</div>
                        <p className="mb-0" onClick={() => { navigate("/admindashboard/createuser") }}>New user registration</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                </div>
                <Dropdown.Divider className="m-0" />
                <Dropdown.Item className="text-center text-primary small py-2">
                  View all notifications
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                <div className="position-relative me-2">
                  <FaUserCircle className="text-primary" size={24} />
                  <span className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle border border-2 border-white"></span>
                </div>
                <div className="d-none d-md-flex flex-column text-start">
                  <span className="fw-bold">{localStorage.getItem("adminuser")}</span>
                  <small className="text-muted">Administrator</small>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm dropdown-menu-end">
                <Dropdown.Header className="fw-bold">Account</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="admin-content px-0">
        <Row className="g-0">
          <Col md={3} lg={2} className="admin-sidebar">
            <Card className="h-100 rounded-0 border-end">
              <Card.Body className="p-0">
                <Nav defaultActiveKey="/createuser" className="flex-column">
                  <Nav.Link as={Link} to="createuser" className="admin-menu-item d-flex align-items-center py-3 px-4">
                    <div className="icon-container me-3"><FaUserPlus className="text-primary" /></div>
                    <span>Create User</span>
                  </Nav.Link>
                  <Nav.Link as={Link} to="assigntask" className="admin-menu-item d-flex align-items-center py-3 px-4">
                    <div className="icon-container me-3"><FaTasks className="text-primary" /></div>
                    <span>Assign Task</span>
                  </Nav.Link>
                  <Nav.Link as={Link} to="taskdetail" className="admin-menu-item d-flex align-items-center py-3 px-4">
                    <div className="icon-container me-3"><FaDatabase className="text-primary" /></div>
                    <span>Task Details</span>
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9} lg={10} className="admin-main-content">
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Dashboard Overview</h4>
                <div>
                  <Button onClick={() => navigate("/admindashboard/assigntask")} variant="warning" size="sm" className="me-2">
                    Assign Task
                  </Button>
                  <Button onClick={() => navigate("/admindashboard/taskdetail")} variant="danger" size="sm" className="me-2">
                    Task Detail
                  </Button>
                  <Button onClick={() => navigate("/admindashboard/createuser")} variant="primary" size="sm">
                    Create New
                  </Button>
                </div>
              </div>

              <Row className="mb-4 g-3">
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="text-muted mb-2">Total Users</h6>
                          <h3 className="mb-0">{data.length}</h3>
                        </div>
                        <div className="bg-primary bg-opacity-10 p-2 rounded">
                          <FaUsers className="text-primary" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="text-muted mb-2">Active Tasks</h6>
                          <h3 className="mb-0">{myData.length}</h3>
                        </div>
                        <div className="bg-warning bg-opacity-10 p-2 rounded">
                          <FaTasks className="text-warning" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="text-muted mb-2">Completed</h6>
                          <h3 className="mb-0">{myData.filter(item => item.taskstatus === true).length}</h3>
                        </div>
                        <div className="bg-success bg-opacity-10 p-2 rounded">
                          <FaTasks className="text-success" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="text-muted mb-2">Pending</h6>
                          <h3 className="mb-0">{myData.filter(item => item.taskstatus === false).length}</h3>
                        </div>
                        <div className="bg-info bg-opacity-10 p-2 rounded">
                          <FaTasks className="text-info" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                  <Outlet context={{ reload, setReload }} />
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
     
      </Container>

    </div>

<Footer/>

  </>
  );

};



export default AdminDashboard;
