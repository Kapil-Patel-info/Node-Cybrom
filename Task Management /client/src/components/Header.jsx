import React, { useState } from "react";
import {
  Form,
  Button,
  Modal,
  Container,
  Navbar,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";
import axios from "axios";
import BackEndUrl from "../config/BackendUrl";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Make sure this exists and matches admin styling

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

    let api = `${BackEndUrl}/user/userlogin`;
    try {
      const response = await axios.post(api, { email, password });
      localStorage.setItem("username", response.data.User.name);
      localStorage.setItem("userid", response.data.User._id);
      navigate("userdashboard");
      handleClose();
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="#" className="fs-4 fw-bold">
            Task Management System
          </Navbar.Brand>
          <div className="ms-auto">
            <FaUserCircle
              onClick={handleShow}
              size={30}
              className="text-white"
              style={{ cursor: "pointer" }}
              title="User Login"
            />
          </div>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fw-semibold">
            User Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-0">
          {error && (
            <div className="alert alert-danger py-2 text-center animate__animated animate__shakeX">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>

            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </Button>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100 login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Login
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              className="w-100 mt-3"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-transparent border-0 text-center w-100">
          <small className="text-muted w-100">
            &copy; {new Date().getFullYear()} Task Management System. All rights reserved.
          </small>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
