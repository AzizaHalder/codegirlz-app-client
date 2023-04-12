import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FloatingLabel from 'react-bootstrap/FloatingLabel'


const LoginPageRecruiter = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);


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
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="RecruiterLogin">
      <h1 className="page-title">Recruiterz Login</h1>
      <Form className="row g-3" onSubmit={handleLogin} id="rec-form-signup">
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={handleEmail} />
          </FloatingLabel>
        </div>
        <br></br>
        <div>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" value={password}
              onChange={handlePassword} />
          </FloatingLabel>
        </div>
        <div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
        <div className="col-md-6">
          <Button id="sign-up-button" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPageRecruiter;
