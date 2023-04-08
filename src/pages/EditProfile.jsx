import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import countries from "../countries.json";



const EditProfile = () => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

    const countryKeys = Object.keys(countries);

    // list of arrays of cities
    const cityArrayList = Object.values(countries);

    const [name, setName] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [city, setCity] = useState("");
    const [level, setLevel] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [newOpp, setNewOpp] = useState(false);
    const [countryIndex, setCountryIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { profileId } = useParams();
    const navigate = useNavigate("");

    const handleName = (e) => setName(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);
    const handleLinkedin = (e) => setLinkedin(e.target.value);
    const handleGithub = (e) => setGithub(e.target.value);
    const handleNewOpp = () => {
        setNewOpp((current) => !current);
    };
    const handleCountryIndex = (e) => setCountryIndex(e.target.value);

    const [address, setAddress] = useState();

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

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_URL}/profile/${profileId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => {
                const profile = res.data;
                console.log(res.data);
                setName(profile.name);
                setCurrentLocation(profile.currentLocation);
                setCity(profile.city);
                setLevel(profile.level);
                setLinkedin(profile.linkedin);
                setGithub(profile.github);
                setNewOpp(profile.newOpp);
            })
            .catch((err) => console.log("Error while updating user profile:", err));
    }, [profileId]);




    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("authToken");
        const updatedProfile = {
            name,
            currentLocation,
            city,
            level,
            linkedin,
            github,
            newOpp,
        };

        axios
            .put(`${API_URL}/profile/edit/${profileId}`, updatedProfile, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setName("");
                setCurrentLocation("");
                setCity("");
                setLevel("");
                setLinkedin("");
                setGithub("");
                setNewOpp(false);
                navigate(`/profile/${profileId}`);
            })
            .catch((err) => console.log("Error while updating user profile:", err));
    };

    const handleDelete = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .delete(`${API_URL}/profile/edit/${profileId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                alert("Your profile has been successfully deleted! ");
                navigate(`${API_URL}/auth/signup`);
            })
            .catch((err) => console.log("Error while deleting profile: ", err));
    };

    return (
        <div className="SignupPage">
            <h1>Edit User Information</h1>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Personal Details</legend>

                    <label htmlFor="">Name:</label>
                    <input type="text" name="name" value={name} onChange={handleName} />


                    <select value={countryIndex} onChange={handleCountryIndex}>
                        <option value="0">Select Country </option>
                        {countryKeys.map((result, index) => (
                            <option value={index} name={result}>{result}</option>
                        ))}
                    </select>
                    <select value={city} onChange={handleCity}>
                        <option>Select City</option>
                        {cityArrayList[countryIndex].map((result) => (
                            <option value={result} name="city">{result}</option>
                        ))}
                    </select>
                </fieldset>
                <div>
                    <label htmlFor="">Enter address :</label>
                    <input ref={inputRef} value={address} name="currentLocation" type="text" />
                </div>

                <fieldset></fieldset>

                <fieldset>
                    <legend>Social Media</legend>
                    <label htmlFor="">Linkedin:</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={linkedin}
                        onChange={handleLinkedin}
                    />
                    <label htmlFor="">Github:</label>
                    <input
                        type="text"
                        name="github"
                        value={github}
                        onChange={handleGithub}
                    />
                </fieldset>

                <fieldset>
                    <input
                        type="checkbox"
                        name="newOpp"
                        id="newOpp"
                        value={newOpp}
                        onClick={handleNewOpp}
                    />
                    <label htmlFor="">Open to new opportunities?</label>

                    <label htmlFor="">Level:</label>
                    <select id="level" name="level" value={level} onChange={handleLevel}>
                        <option value="">Select Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                    </select>
                </fieldset>

                <button type="submit">Save Changes</button>
            </form>

            <button onClick={handleDelete}>Delete</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    );
}


export default EditProfile;