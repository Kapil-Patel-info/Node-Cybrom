import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import BackEndUrl from '../config/BackendUrl';

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackEndUrl}/user/userlogin`;
    try {
      const response = await axios.post(api, { email, password });
      console.log(response);
      handleClose();
    } catch (error) {
      console.log(error);
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
              style={{ cursor: 'pointer' }}
              title="User Login"
            />
          </div>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fw-semibold">User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-0">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <FaEnvelope className="me-2 text-muted" />
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <FaLock className="me-2 text-muted" />
                Password
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="link"
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 text-decoration-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" size="lg">
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
