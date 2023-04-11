import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import countries from "../countries.json";
import Card from "react-bootstrap/Card";
import images from "../images.json";
import Button from "react-bootstrap/Button";


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
    const [profileImg, setProfileImg] = useState("");
    const [randomImg, setRandomImg] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState();

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
    const handleDescription = (e) => setDescription(e.target.value);


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
                setProfileImg(profile.profileImg);
                setDescription(profile.description);
            })
            .catch((err) => console.log("Error while updating user profile:", err));
    }, [profileId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("authToken");
        const updatedProfile = {
            name,
            currentLocation: address,
            city,
            level,
            linkedin,
            github,
            newOpp,
            profileImg: profileImg,
            description
        };

        axios
            .put(`${API_URL}/profile/${profileId}/edit`, updatedProfile, {
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
                setProfileImg("");
                setDescription("");
                alert("Your profile has been successfully updated! ");
                navigate(`/profile/${profileId}`);
            })
            .catch((err) => console.log("Error while updating user profile:", err));
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
        <div className="EditProfile">
            <h1>Update Personal Details</h1>

            <form onSubmit={handleSubmit} className="mb-3" id="profile-details-container">
                <div className="profile-details-container" >
                    <div>
                        <Card.Img src={profileImg} style={{ width: "15rem" }} />
                    </div>
                    <div>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            id="random-image-button"
                            onClick={generateNewImageUrl}
                        >
                            Press for New Random Profile Image
                        </Button>
                    </div>
                </div>

                <div className="col-md-6" id="personal-details-container">
                    <legend>Personal Details</legend>
                    <div>
                        <label className="form-label">Describe yourself. <br></br>What are you looking for in your next role? <br></br>Share about a project you're working on and your specific contribution.</label>
                        <input type="textarea"
                            style={{ height: '100px' }} className="form-control" name="description" value={description} onChange={handleDescription} />
                    </div>
                    <div>
                        <label className="form-label">Name: </label>
                        <input type="text" className="form-control" name="name" value={name} onChange={handleName} />
                    </div>
                </div>

                <div className="col-md-6" >
                    <legend>Residence Information</legend>
                    <label className="form-label">Enter Country of Residence:</label>
                    <select className="form-select" value={countryIndex} onChange={handleCountryIndex}>
                        <option value="0">Select Country </option>
                        {countryKeys.map((result, index) => (
                            <option value={index} name={result}>
                                {result}
                            </option>
                        ))}
                    </select>
                    <label className="form-label">Enter City of Residence:</label>
                    <select className="form-select" value={city} onChange={handleCity}>
                        <option>Select City</option>
                        {cityArrayList[countryIndex].map((result) => (
                            <option value={result} name="city">
                                {result}
                            </option>
                        ))}
                    </select>

                    <label className="form-label">Search address: </label>
                    <input className="form-control"
                        ref={inputRef}
                        value={address}
                        name="currentLocation"
                        type="text"
                    />

                </div>

                <div className="col-md-6" >
                    <legend>Social Media</legend>
                    <label className="form-label">Linkedin: </label>
                    <input className="form-control"
                        type="url"
                        name="linkedin"
                        value={linkedin}
                        onChange={handleLinkedin}
                    />
                    <label className="form-label">Github: </label>
                    <input className="form-control"
                        type="url"
                        name="github"
                        value={github}
                        onChange={handleGithub}
                    />


                    <div>
                        <input className="form-check-input"
                            type="checkbox"
                            name="newOpp"
                            id="newOpp"
                            value={newOpp}
                            onClick={handleNewOpp}
                        />
                        <label className="form-label">Open to new opportunities?</label>
                    </div><div>
                        <label className="form-label">Level: </label>
                        <select id="level" name="level" value={level} onChange={handleLevel} className="form-select">
                            <option value="">Select Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Junior">Junior</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Senior">Senior</option>
                            <option value="Lead">Lead</option>
                        </select>
                    </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div class="col-12" id="save-button-div">
                    <button class="btn btn-primary" type="submit" id="save-button">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
