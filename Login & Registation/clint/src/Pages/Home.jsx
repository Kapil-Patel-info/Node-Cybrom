import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import backendUrl from "../BackendUrl";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${backendUrl}/login`, formData);
    toast.success(response.data.message);
     localStorage.setItem("email", formData.email);
    if (response.data.username) {
      localStorage.setItem("username", response.data.username);
    }
    const timeoutId = setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
  } catch (error) {
    console.log("Error frontend = ", error);
    toast.error(error.response.data.message); 
  }
};

  return (
    <>
      <h1>Login Form</h1>
      <Form className="center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="danger" type="submit">
          LogIn User
        </Button>
      </Form>

      <p>
        {" "}
        Don't have an Account{" "}
        <span
          onClick={() => {
            navigate("/registration");
          }}
          style={{ cursor: "pointer", color: "red" }}
        >
          Register-user
        </span>{" "}
        now{" "}
      </p>
       <ToastContainer />
    </>
  );
};

export default Home;
