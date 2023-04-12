import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import countries from "../countries.json";
import FloatingLabel from 'react-bootstrap/FloatingLabel'


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
const SignUpPageRecruiter = () => {
  const countryKeys = Object.keys(countries);
  const cityArrayList = Object.values(countries);

  const [recruiterName, setRecruiterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [countryIndex, setCountryIndex] = useState(0);


  const handleCountryIndex = (e) => setCountryIndex(e.target.value);
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
      <Form className="row g-3" onSubmit={handleSignupSubmit} id="rec-form-signup">
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Aziza" value={recruiterName}
              onChange={handleRecruiterName} />
          </FloatingLabel>
        </div>
        <br></br>
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
        <br></br>
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Company"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Company" value={company} onChange={handleCompany} />
          </FloatingLabel>
        </div>

        <div>
          <Form.Floating className="form-margin">
            <Form.Select value={countryIndex} onChange={handleCountryIndex}>
              <option value="0">Select Country </option>
              {countryKeys.map((result, index) => (
                <option value={index}>{result}</option>
              ))}
            </Form.Select>
            <br></br>

            <Form.Select value={city} onChange={handleCity}>
              <option>Select City</option>
              {cityArrayList[countryIndex].map((result) => (
                <option value={result}>{result}</option>
              ))}
            </Form.Select>
          </Form.Floating>
        </div>
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Linkedin URL"
            className="mb-3"
          >
            <Form.Control type="url" placeholder="linkedin" value={linkedin} onChange={handleLinkedin} />
          </FloatingLabel>
        </div>
        <div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
        <Link to={`${API_URL}/auth/recruiter/signup`}>
          <Button type="submit" id="sign-up-button">Sign Up</Button>
        </Link>
      </Form>
    </div>
  );
};

export default SignUpPageRecruiter;
