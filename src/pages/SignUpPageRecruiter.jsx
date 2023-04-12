import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
const SignUpPageRecruiter = () => {
  const [recruiterName, setRecruiterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const handleRecruiterName = (e) => setRecruiterName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCompany = (e) => setCompany(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleLinkedin = (e) => setLinkedin(e.target.value);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      recruiterName,
      email,
      password,
      company,
      city,
      linkedin,
    };

    axios
      .post(`${API_URL}/auth/recruiter/signup`, requestBody)
      .then((response) => {
        navigate("/auth/recruiter/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="RecruiterSignup">
      <h1 className="page-title"> Recruiterz Sign Up</h1>
      <Form className="col-md-6" onSubmit={handleSignupSubmit}>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={recruiterName}
          onChange={handleRecruiterName}
        />

        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={handleEmail} />

        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={handlePassword}
        />

        <Form.Label>Company:</Form.Label>
        <Form.Control type="text" value={company} onChange={handleCompany} />

        <Form.Label>City:</Form.Label>
        <Form.Control type="text" value={city} onChange={handleCity} />

        <Form.Label>linkedin:</Form.Label>
        <Form.Control type="text" value={linkedin} onChange={handleLinkedin} />
        <div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
        <Link to={`${API_URL}/auth/recruiter/signup`}>
          <Button type="submit">Sign Up</Button>
        </Link>
      </Form>
    </div>
  );
};

export default SignUpPageRecruiter;
