import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

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
    <div className="LoginPage">
      <h1 className="page-title">CodeGirlz Login</h1>
      <Form className="row g-3" onSubmit={handleLoginSubmit} id="form-login">
        <div>
          <FloatingLabel
            label="Email"
            controlId="floatingInput"
            className="mb-3"
          >
            <Form.Control
              type="email"
              value={email}
              required
              onChange={handleEmail}
            />
          </FloatingLabel>
        </div>
        <br />
        <div>
          <FloatingLabel
            label="Password"
            controlId="floatingPassword"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </FloatingLabel>
        </div>

        <div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>

        <div className="col-12" id="log-in-button-div">
          <button className="btn btn-primary" type="submit" id="sign-up-button" >
            Login
          </button>
        </div>

      </Form>

      <div className="col-12" id="sign-up-button-div">
        <p>Don't have an account yet?</p>
        <Link to={"/auth/signup"}>
          <Button className="btn btn-primary" type="submit" id="login-button">
            Sign Up
          </Button>
        </Link>
      </div>

      <section>
        <Link to={"/auth/recruiter/signup"}>
          <Button id="login-button">
            Are You a Recruiter? <br /> Sign up your company!
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default LoginPage;
