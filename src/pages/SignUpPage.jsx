import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import countries from "../countries.json";
import Card from "react-bootstrap/Card";
import images from "../images.json";
import Button from "react-bootstrap/Button";

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
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [newOpp, setNewOpp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [city, setCity] = useState("");
  const [countryIndex, setCountryIndex] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [randomImg, setRandomImg] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleLevel = (e) => setLevel(e.target.value);
  const handleLinkedin = (e) => setLinkedin(e.target.value);
  const handleGithub = (e) => setGithub(e.target.value);
  const handleNewOpp = () => {
    setNewOpp((current) => !current);
  };
  const handleCountryIndex = (e) => setCountryIndex(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);


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
      linkedin,
      github,
      newOpp,
      profileImg: profileImg,
      userDescription: userDescription,
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

  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  return (
    <div className="SignupPage">
      <h1>CodeGirlz Sign Up</h1>

      <form class="row g-3" onSubmit={handleSignupSubmit} id="form-signup">
        <div id="profile-pic-container">
          <Card.Img src={profileImg} style={{ width: "10rem" }} />
          <Button
            variant="outline-secondary"
            size="sm"
            id="random-image-button"
            onClick={generateNewImageUrl}
          >
            Press for Random Profile Image
          </Button>
        </div>
        <fieldset class="col-md-6" id="personal-details-container">
          <legend>Personal Details</legend>
          <div>
            <label class="form-label" for="validationServer01" >Name:</label>
            <input type="text" class="form-control" name="name" id="validationDefault01" value={name} onChange={handleName} required />
          </div>
          <label for="validationDefault02" class="form-label">Email:</label>
          <input class="form-control" id="validationDefault02" required
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label for="validationDefault03" class="form-label">Password:</label>
          <input class="form-control" id="validationDefault03" required
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </fieldset>
        <fieldset class="col-md-6" >
          <legend>Residence Information</legend>
          <label class="form-label">Enter Country of Residence:</label>
          <select class="form-select" value={countryIndex} onChange={handleCountryIndex}>
            <option value="0">Select Country </option>
            {countryKeys.map((result, index) => (
              <option value={index}>{result}</option>
            ))}
          </select>
          <label class="form-label">Enter City of Residence:</label>
          <select class="form-select" value={city} onChange={handleCity}>
            <option>Select City</option>
            {cityArrayList[countryIndex].map((result) => (
              <option value={result}>{result}</option>
            ))}
          </select>
          <div>
            <label class="form-label">Enter Current Address :</label>
            <input class="form-control" ref={inputRef} value={address} type="text" onChange={handleAddress} />
          </div>
        </fieldset>


        <fieldset class="col-md-6">
          <legend>Social Media</legend>
          <label class="form-label">Linkedin:</label>
          <input class="form-control"
            type="text"
            name="linkedin"
            value={linkedin}
            onChange={handleLinkedin}
          />
          <label class="form-label">Github:</label>
          <input class="form-control"
            type="text"
            name="github"
            value={github}
            onChange={handleGithub}
          />
        </fieldset>

        <fieldset class="col-md-6">
          <input class="form-check-input" required
            type="checkbox"
            name={newOpp}
            id="newOpp invalidCheck2"
            value={newOpp}
            onClick={handleNewOpp}
          />
          <label htmlFor="" class="form-check-label" for="invalidCheck2">Open to new opportunities?</label>
          <div>
            <label for="validationDefault03" class="form-label">Level of Programmer:</label>
            <select class="form-control" id="validationDefault03 level-label" required name={level} onChange={handleLevel}>
              <option value="">Select Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </fieldset>
        <fieldset class="col-md-6">
          <label
            htmlFor=""
            for="validationTextarea" class="form-label"
          >
            Describe yourself. What makes you unique as a developer? What are you passionate about? What projects are you currently working on? What are you're looking for in your next role.         </label>
          <textarea class="form-control"
            rows="5"
            cols="30"
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </fieldset>
        <div>{errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}</div>

        <div class="col-12" id="sign-up-button-div">
          <button class="btn btn-primary" type="submit" id="sign-up-button">Sign Up</button>
        </div>
        <div class="col-12" id="login-container">
          <p>Already have an account?</p>
          <Link to={"/login"}><button class="btn btn-primary" type="submit" id="login-button">Login</button></Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
