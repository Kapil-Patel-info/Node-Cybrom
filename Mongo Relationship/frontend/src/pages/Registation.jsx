import { useState } from "react";
import axios from "axios";
import BackendUrl from "../BackendUrl";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Registation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${BackendUrl}/registration`;

    try {
      const response = await axios.post(api, data);
      console.log(response);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);

      alert("User registered successfully!");
      setData({ name: "", age: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      console.log("Error from front-end:", err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Card style={{ width: '25rem' }} className="bg-secondary text-light p-4 shadow-lg rounded-4">
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Button variant="outline-light" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registation;
