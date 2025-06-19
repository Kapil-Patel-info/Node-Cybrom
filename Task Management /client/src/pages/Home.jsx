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
  InputGroup
} from 'react-bootstrap';
import { FaUserShield, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import BackEndUrl from '../config/BackendUrl';

const Home = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      navigate('/admindashboard/taskdetail');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-lg overflow-hidden">
              {/* Card Header with Decorative Stripe */}
              <div className="bg-primary py-3">
                <div className="text-center">
                  <FaUserShield size={32} className="text-white" />
                </div>
              </div>
              
              <Card.Body className="p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary">Admin Portal</h3>
                  <p className="text-muted mb-0">Enter your credentials to continue</p>
                </div>

                {error && (
                  <Alert 
                    variant="danger" 
                    className="d-flex align-items-center"
                    onClose={() => setError('')}
                    dismissible
                  >
                    <FaUserShield className="flex-shrink-0 me-2" />
                    <div>{error}</div>
                  </Alert>
                )}

                <Form onSubmit={handleLogin} className="mt-4">
                  <FloatingLabel 
                    controlId="floatingAdminId" 
                    label="Admin ID" 
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Admin ID"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      required
                      className="ps-4"
                    />
                    <FaUserShield className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  </FloatingLabel>

                  <FloatingLabel 
                    controlId="floatingPassword" 
                    label="Password"
                    className="mb-4"
                  >
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="ps-4 pe-5"
                      />
                      <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Button
                        variant="link"
                        className="position-absolute top-50 end-0 translate-middle-y me-3 p-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </FloatingLabel>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="fw-semibold"
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="me-2" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              
              <Card.Footer className="bg-transparent border-0 text-center py-3">
                <small className="text-muted">
                  &copy; {new Date().getFullYear()} Task Management System
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
        
        .card {
          border-radius: 0.75rem;
          overflow: hidden;
        }
        
        .bg-primary {
          background-color: #4e73df !important;
          background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
        }
        
        .floating-label .form-control {
          padding-left: 2.5rem !important;
        }
      `}</style>
    </div>
  );
};

export default Home;