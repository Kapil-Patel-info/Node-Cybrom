import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Card,
  Container,
  Alert,
  Spinner,
  FloatingLabel
} from 'react-bootstrap';
import { FaUserPlus, FaEnvelope, FaUserTag, FaCheckCircle } from 'react-icons/fa';
import BackEndUrl from '../config/BackendUrl';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.designation) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BackEndUrl}/admin/usercreation`, formData);
      console.log(response);
      setSuccess(true);
      setFormData({ name: '', email: '', designation: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create user');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const designations = [
    'Programmer',
    'Developer',
    'Designer',
    'Database Developer',
    'Analyst',
    'Coder',
    'Team Lead',
    'Manager'
  ];

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
        <Card.Header className="bg-primary text-white py-3">
          <div className="d-flex align-items-center justify-content-center">
            <FaUserPlus className="me-2" size={24} />
            <h3 className="mb-0">Create New User</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <p className="text-muted text-center mb-4">
            Fill in the details below to create a new user account
          </p>

          {error && (
            <Alert 
              variant="danger" 
              onClose={() => setError('')} 
              dismissible
              className="animate__animated animate__fadeIn"
            >
              <FaUserTag className="me-2" />
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              variant="success" 
              onClose={() => setSuccess(false)} 
              dismissible
              className="animate__animated animate__fadeIn"
            >
              <FaCheckCircle className="me-2" />
              User created successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingName"
              label="Full Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-2"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingEmail"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-2"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDesignation"
              label=""
              className="mb-4"
            >
              <Form.Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="border-2 py-3"
              >
                <option value="">Select Designation</option>
                {designations.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <div className="d-grid mt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                size="lg"
                className="fw-bold py-2 text-uppercase"
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
                    Creating User...
                  </>
                ) : (
                  <>
                    <FaUserPlus className="me-2" />
                    Create User
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateUser;