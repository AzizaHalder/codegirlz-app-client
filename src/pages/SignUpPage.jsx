import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import countries from '../countries.json';

const API_URL = "http://localhost:5005";

function SignupPage() {

  // the list of country names, an Array of 116 countries 
  const countryKeys = Object.keys(countries);
  // list of arrays of cities
  const cityArrayList = Object.values(countries)

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


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      name,
      city,
      level,
      linkedin,
      github,
      newOpp,
    };


    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };



  return (
    <div className="SignupPage">

      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>

        <fieldset>
          <legend>Personal Details</legend>

          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} />

          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmail} />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <select value={countryIndex} onChange={handleCountryIndex}>
            <option>Select Country </option>
            {
              countryKeys.map((result, index) => (<option value={index}>{result}</option>))
            }
          </select>
          <select>
            <option name="city" value={city} onChange={handleCity}>Select City</option>
            {
              cityArrayList[countryIndex].map((result) => (<option value={result}>{result}</option>))
            }
          </select>
        </fieldset>

        <fieldset>
          <legend>Social Media</legend>
          <label>Linkedin:</label>
          <input
            type="text"
            name="linkedin"
            value={linkedin}
            onChange={handleLinkedin}
          />
          <label>Github:</label>
          <input
            type="text"
            name="github"
            value={github}
            onChange={handleGithub}
          />
        </fieldset>

        <fieldset>

          <input type="checkbox" name={newOpp} id="newOpp" value={newOpp}
            onClick={handleNewOpp} />
          <label htmlFor="">Open to new opportunities?</label>


          <label htmlFor="">Level:</label>
          <select
            id="level"
            name={level}
            onChange={handleLevel}
          >
            <option value="" >
              Select Level
            </option>
            <option value="Entry Level">Entry Level</option>
            <option value="Junior">Junior</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;