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
  FloatingLabel
} from 'react-bootstrap';

import {
  FaTasks,
  FaUserCheck,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowAltCircleRight,
  FaUserCircle  // ✅ correct location here
} from 'react-icons/fa';

import BackEndUrl from "../config/BackendUrl";

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

    // Validation
    if (!formData.title || !formData.description || !formData.complday) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BackEndUrl}/admin/assigntask`, {
        ...formData,
        userid: userId
      });
      console.log(response.data);
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

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaTasks className="text-primary me-2" />
                Assign Tasks
              </h2>
              <p className="text-muted mb-0">Select a user to assign new tasks</p>
            </div>
            <Badge bg="light" text="dark" pill>
              {users.length} Users
            </Badge>
          </div>

          <div className="table-responsive">
            <Table striped hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <FaUserCircle size={20} className="text-secondary" />
                        </div>
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <small className="text-muted">ID: {user._id.substring(0, 6)}...</small>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg="info" className="text-capitalize">
                        {user.designation}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
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

      {/* Assign Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>
            <FaUserCheck className="text-primary me-2" />
            Assign New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success && (
            <Alert variant="success" className="text-center">
              Task assigned successfully!
            </Alert>
          )}

          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: '100px' }}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDays"
              label="Completion Days"
              className="mb-4"
            >
              <Form.Control
                type="number"
                placeholder="Completion Days"
                name="complday"
                min="1"
                value={formData.complday}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                ) : (
                  <FaTasks className="me-2" />
                )}
                {loading ? 'Assigning...' : 'Assign Task'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AssignTask;