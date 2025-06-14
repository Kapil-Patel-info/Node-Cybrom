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
import { FaUserPlus, FaEnvelope, FaUserTag } from 'react-icons/fa';
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
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <FaUserPlus size={32} className="text-primary mb-2" />
            <h2>Create New User</h2>
            <p className="text-muted">Fill in the details to create a new user account</p>
          </div>

          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
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
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDesignation"
              label="Select Designation"
              className="mb-4"
            >
              <Form.Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                {designations.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                size="lg"
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
                    Creating...
                  </>
                ) : (
                  'Create User'
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