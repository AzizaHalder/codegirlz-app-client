import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [level, setLevel] = useState("Junior");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [newOpp, setNewOpp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);
    const handleLinkedin = (e) => setLinkedin(e.target.value);
    const handleGithub = (e) => setGithub(e.target.value);
    const handleNewOpp = (e) => setNewOpp(e.target.value);


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { email, password, name, city, level, linkedin, github, newOpp };

        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate("/auth/login");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />

                <label>Name:</label>
                <input type="text" name="name" value={name} onChange={handleName} />

                <label>City:</label>
                <input type="text" name="city" value={city} onChange={handleCity} />

                <label>Level:</label>
                <input type="text" name="level" value={level} onChange={handleLevel} />

                <label>Linkedin:</label>
                <input type="text" name="linkedin" value={linkedin} onChange={handleLinkedin} />

                <label>Github:</label>
                <input type="text" name="github" value={github} onChange={handleGithub} />

                <label>Open to new opportunities?</label>
                <input type="text" name="newOpp" value={newOpp} onChange={handleNewOpp} />

                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;