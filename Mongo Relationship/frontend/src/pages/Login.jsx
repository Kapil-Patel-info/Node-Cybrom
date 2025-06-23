import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackendUrl from '../BackendUrl';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${BackendUrl}/login`;

    try {
      const response = await axios.post(api, data);
      console.log(response); 


      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);

      alert("Login successfully!");
      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Card style={{ width: '25rem' }} className="bg-secondary text-light p-4 shadow-lg rounded-4">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="bg-dark text-light border-secondary"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="bg-dark text-light border-secondary"
                required
              />
            </Form.Group>

            <Button variant="outline-light" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
