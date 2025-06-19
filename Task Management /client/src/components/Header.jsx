import React, { useState } from "react";
import {
  Form,
  Button,
  Modal,
  Container,
  Navbar,
  Spinner,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import axios from "axios";
import BackEndUrl from "../config/BackendUrl";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setError("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setLoading(false);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BackEndUrl}/user/userlogin`, { 
        email, 
        password 
      });
      
      localStorage.setItem("username", email);
      localStorage.setItem("userid", response.data.User._id);
      navigate("userdashboard/mytask");
      handleClose();
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold d-flex align-items-center">
            <span className="me-2">📋</span>
            Task Management System
          </Navbar.Brand>
          <div className="ms-auto">
            <Button 
              variant="outline-light" 
              onClick={handleShow}
              className="d-flex align-items-center"
            >
              <FaUserCircle className="me-2" />
              User Login
            </Button>
          </div>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center fw-bold text-primary">
            <FaSignInAlt className="me-2" />
            User Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-0">
          {error && (
            <Alert variant="danger" className="d-flex align-items-center">
              <FaUserCircle className="me-2" />
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FloatingLabel 
              controlId="floatingEmail" 
              label="Email address" 
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2"
              />
              <div className="form-icon">
                <FaEnvelope />
              </div>
            </FloatingLabel>

            <FloatingLabel 
              controlId="floatingPassword" 
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 pe-5"
              />
              <div className="form-icon">
                <FaLock />
              </div>
              <Button
                variant="link"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" />
                    Sign In
                  </>
                )}
              </Button>
              
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0 justify-content-center">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} Task Management System
          </small>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .form-icon {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          color: #6c757d;
        }
        
        .form-control {
          padding-left: 40px !important;
        }
        
        .password-toggle {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          color: #6c757d;
          text-decoration: none;
        }
        
        .border-2 {
          border-width: 2px !important;
        }
      `}</style>
    </>
  );
};

export default Header;