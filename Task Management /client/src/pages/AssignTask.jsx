import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Card,
  Alert,
  Spinner,
  Badge,
  FloatingLabel,
  Row,
  Col
} from 'react-bootstrap';
import {
  FaTasks,
  FaUserCheck,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowAltCircleRight,
  FaUserCircle,
  FaSearch,
  FaRegCheckCircle,
  FaRegClock
} from 'react-icons/fa';
import BackEndUrl from "../config/BackendUrl";
import '../css/AssignTask.css'; // Custom CSS for premium styling

const AssignTask = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    complday: ''
  });
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = async () => {
    try {
      const response = await axios.get(`${BackEndUrl}/admin/showuserdata`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
      setError('Failed to load user data');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAssignTask = (userId) => {
    setUserId(userId);
    setShowModal(true);
    setFormData({ title: '', description: '', complday: '' });
    setSuccess(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.description || !formData.complday) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BackEndUrl}/admin/assigntask`, {
        ...formData,
        userid: userId
      });
      setSuccess(true);
      setFormData({ title: '', description: '', complday: '' });
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error assigning task:", error);
      setError(error.response?.data?.message || 'Failed to assign task');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-4 assign-task-container">
      <Card className="shadow-lg border-0 premium-card">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1 text-gradient">
                <FaTasks className="me-2" />
                Task Assignment
              </h2>
              <p className="text-muted mb-0">Manage and assign tasks to your team members</p>
            </div>
            <Badge bg="light" text="dark" pill className="fs-6 px-3 py-2 shadow-sm">
              {users.length} Active Users
            </Badge>
          </div>

          <div className="mb-4">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users by name, email or designation..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="premium-table">
              <thead>
                <tr>
                  <th className="ps-4">#</th>
                  <th>User Profile</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className="user-row">
                    <td className="ps-4">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-3">
                          <FaUserCircle size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <small className="text-muted">ID: {user._id.substring(0, 6)}...</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-primary">{user.email}</div>
                    </td>
                    <td>
                      <Badge pill className="role-badge text-capitalize">
                        {user.designation}
                      </Badge>
                    </td>
                    <td className="text-end pe-4">
                      <Button
                        variant="primary"
                        size="sm"
                        className="assign-btn"
                        onClick={() => handleAssignTask(user._id)}
                      >
                        <FaArrowAltCircleRight className="me-1" />
                        Assign Task
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Premium Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
        backdrop="static"
        className="premium-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-gradient">
            <FaUserCheck className="me-2" />
            New Task Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pt-0">
          {success && (
            <Alert variant="success" className="alert-success-custom text-center">
              <FaRegCheckCircle className="me-2" size={20} />
              Task assigned successfully!
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="alert-danger-custom" onClose={() => setError('')} dismissible>
              <FaInfoCircle className="me-2" />
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="mt-3">
            <FloatingLabel
              controlId="floatingTitle"
              label="Task Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Task Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control-custom"
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDescription"
              label="Task Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: '120px' }}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control-custom"
                required
              />
            </FloatingLabel>

            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingDays"
                  label="Completion Days"
                >
                  <Form.Control
                    type="number"
                    placeholder="Completion Days"
                    name="complday"
                    min="1"
                    value={formData.complday}
                    onChange={handleInputChange}
                    className="form-control-custom"
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted me-2" />
                <small className="text-muted">Estimated completion time</small>
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Assigning...
                  </>
                ) : (
                  <>
                    <FaTasks className="me-2" />
                    Assign Task
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AssignTask;