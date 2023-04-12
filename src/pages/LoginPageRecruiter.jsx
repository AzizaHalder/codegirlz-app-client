import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const LoginPageRecruiter = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleLogin = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/recruiter/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => console.log("Error while logging in:", err));
  };

  return (
    <div className="RecruiterLogin">
      <h1 className="page-title">Recruiterz Login</h1>
      <Form className="row g-3" onSubmit={handleLogin}>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={handleEmail} />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <Button className="btn" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPageRecruiter;
