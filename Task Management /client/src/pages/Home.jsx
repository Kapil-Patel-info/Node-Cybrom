import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Form,
  Card,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap';
import { FaUserShield, FaLock, FaSignInAlt } from 'react-icons/fa';
import BackEndUrl from '../config/BackendUrl';
import '../css/Login.css';

const Home = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${BackEndUrl}/admin/logincheck`, {
        adminid: adminId,
        password,
      });

      localStorage.setItem('adminuser', data.admin.name);
      localStorage.setItem('adminToken', data.token);
      navigate('/admindashboard');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="login-card shadow-lg animate__animated animate__fadeIn">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="login-icon bg-primary">
                    <FaUserShield size={28} className="text-white" />
                  </div>
                  <h3 className="mt-3 mb-2">Admin Login</h3>
                  <p className="text-muted">Please enter your credentials below</p>
                </div>

                {error && (
                  <Alert
                    variant="danger"
                    className="animate__animated animate__shakeX"
                    onClose={() => setError('')}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <FloatingLabel controlId="floatingAdminId" label="Admin ID" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Admin ID"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      required
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FloatingLabel>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 login-btn"
                    disabled={loading}
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
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Login
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center py-3 bg-transparent">
                <small className="text-muted">
                  &copy; {new Date().getFullYear()} Task Management System. All rights reserved.
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
