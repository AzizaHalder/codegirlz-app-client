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

  // how to access the index of the country array 
  // const array = Object.keys(cityArrayList)
  // console.log(array[0])
  // do I need a useEffect?


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [newOpp, setNewOpp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [cityIndex, setCityIndex] = useState(0);


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
  const handleCountry = (e) => setCountry(e.target.value);
  const handleCityIndex = (e) => {
    setCityIndex(+e.target.value);
    console.log(cityIndex)
  }


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      name,
      country,
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

          {/* how do I access the index of the country.map in order to set that index as the cityIndex?
Currently the dropdown only shows the state of 0, which is the default. 
How do I get the state to update based off the index of the input from the user of the country?  */}
          <select >
            <option name="country" id="country" value={country} onChange={handleCountry}>Select Country </option>
            {
              countryKeys.map((result, index) => (<option value={index} onChange={handleCityIndex}>{result}</option>))
            }

          </select>
          <select>
            <option name="city" value={city} onChange={handleCity}>Select City</option>
            {
              cityArrayList[cityIndex].map((result, index) => (<option value={result} onChange={handleCountry}>{result}</option>))

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