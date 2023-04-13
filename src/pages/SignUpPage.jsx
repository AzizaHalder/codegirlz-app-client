import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import countries from "../countries.json";
import Card from "react-bootstrap/Card";
import images from "../images.json";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function SignupPage() {
  // the list of country names, an Array of 116 countries
  const countryKeys = Object.keys(countries);

  // list of arrays of cities
  const cityArrayList = Object.values(countries);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [newOpp, setNewOpp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [city, setCity] = useState("");
  const [countryIndex, setCountryIndex] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [randomImg, setRandomImg] = useState("");
  const [address, setAddress] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleNewOpp = () => {
    setNewOpp((current) => !current);
  };
  const handleCountryIndex = (e) => setCountryIndex(e.target.value);

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    fields: ["name"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setAddress(place.name);
    });
  }, []);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      name,
      city,
      currentLocation: address,
      level,
      newOpp,
      profileImg,
      linkedin,
      github,
      description,
    };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    setProfileImg(randomImg);
  }, [randomImg]);

  const generateNewImageUrl = () => {
    let randomIndex = Math.floor(Math.random() * 30);
    setRandomImg(images.images[randomIndex]);
    setProfileImg(randomImg);
  };

  return (
    <div className="SignupPage">
      <h1 className="page-title">CodeGirlz Sign Up</h1>

      <Form className="row g-3" onSubmit={handleSignupSubmit} id="form-signup">
        <div id="profile-pic-container">
          {profileImg && (
            <Card.Img src={profileImg} style={{ width: "10rem" }} />
          )}
          {!profileImg && (
            <Card.Img
              src="https://api.dicebear.com/6.x/pixel-art/svg?seed=Kiki"
              style={{ width: "10rem" }}
            />
          )}
          <Button
            variant="outline-secondary"
            size="sm"
            id="random-image-button"
            onClick={generateNewImageUrl}
          >
            Press for New Random Profile Image
          </Button>
        </div>
        <fieldset className="col-md-6" id="personal-details-container">
          <legend>Personal Details</legend>
          <div>
            <FloatingLabel label="Name" className="form-margin">
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                required
              />
            </FloatingLabel>
          </div>
          <FloatingLabel label="Email" className="form-margin">
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="form-margin">
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </FloatingLabel>
        </fieldset>
        <fieldset className="col-md-6">
          <legend>Residence Information</legend>
          <FloatingLabel label="Country of Residence" className="form-margin">
            <Form.Select
              className="form-select"
              value={countryIndex}
              onChange={handleCountryIndex}
            >
              <option value="0">Select Country </option>
              {countryKeys.map((result, index) => (
                <option value={index}>{result}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label="City of Residence" className="form-margin">
            <Form.Select
              className="form-select"
              value={city}
              onChange={handleCity}
            >
              <option>Select City</option>
              {cityArrayList[countryIndex].map((result) => (
                <option value={result}>{result}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </fieldset>

        <fieldset className="col-md-6">
          <input
            className="form-check-input"
            type="checkbox"
            name="newOpp"
            id="newOpp"
            value={newOpp}
            onClick={handleNewOpp}
          />
          <label htmlFor="" className="form-check-label">
            Open to new opportunities?
          </label>
        </fieldset>
        <div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>

        <div className="col-12" id="sign-up-button-div">
          <button class="btn btn-primary" type="submit" id="sign-up-button">
            Sign Up
          </button>
        </div>
        <div class="col-12" id="login-container">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <button class="btn btn-primary" type="submit" id="login-button">
              Login
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default SignupPage;
