import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";

function Profile() {
  const [profileSelected, setProfile] = useState("");

  const { user, isLoggedIn } = useContext(AuthContext);

  const { profileId } = useParams();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/profile/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        setProfile(result.data);
      })
      .catch((err) =>
        console.log("Error while retrieving profile details:", err)
      );
  }, [profileId]);

  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/profile/${profileId}/edit`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        alert("Your profile has been successfully deleted! ");
        navigate("/");
      })
      .catch((err) => console.log("Error while deleting profile: ", err));
  };

  if (profileSelected) {
    return (
      <div id="profile-container">
        <div>
          <Card.Body style={{ width: "30rem" }} id="profile-page">
            <div>
              {profileSelected.profileImg && (
                <Card.Img
                  variant="top"
                  src={profileSelected.profileImg}
                  style={{ width: "10rem" }}
                />
              )}
              {!profileSelected.profileImg && (
                <Card.Img
                  variant="top"
                  src="https://api.dicebear.com/6.x/pixel-art/svg?seed=Kiki"
                  style={{ width: "10rem" }}
                />
              )}
            </div>
            <br></br>
            <div>
              <Link to={`/profile/${profileId}/edit`}>
                <Button variant="outline-secondary" size="sm">
                  Change Profile Pic
                </Button>
              </Link>
            </div>
          </Card.Body>
        </div>
        <Card.Body>
          <Card.Title style={{ fontSize: "3rem" }}>
            {profileSelected.name}
          </Card.Title>
          {profileSelected.description && (
            <Card.Text>{profileSelected.description}</Card.Text>
          )}
          {!profileSelected.description && (
            <Card.Text>
              <Link to={`/profile/${profileId}/edit`}>
                Tell recruiters more about yourself by adding a description
              </Link>
            </Card.Text>
          )}
        </Card.Body>
        <legend>Residence Information</legend>
        <ListGroup className="list-group-flush">
          {profileSelected.currentLocation && (
            <ListGroup.Item>
              Address: {profileSelected.currentLocation}
            </ListGroup.Item>
          )}
          {!profileSelected.currentLocation && (
            <ListGroup.Item>
              <Link to={`/profile/${profileId}/edit`}>Add Address</Link>
            </ListGroup.Item>
          )}
          <ListGroup.Item>City: {profileSelected.city}</ListGroup.Item>
          <legend>Experience</legend>
          {profileSelected.level && (
            <ListGroup.Item>Level: {profileSelected.level}</ListGroup.Item>
          )}
          {!profileSelected.level && (
            <ListGroup.Item>
              <Link to={`/profile/${profileId}/edit`}>Add Level</Link>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            Open to new opportunities?<br></br>
            {profileSelected.newOpp === true ? <p>Yes!</p> : <p>Not yet..</p>}
          </ListGroup.Item>
        </ListGroup>
        <legend>Social Media</legend>
        <Card.Body id="social-media">
          <div id="social-link">
            {profileSelected.github && (
              <Card.Text>
                <Link target="_blank" to={profileSelected.github}>
                  Github{" "}
                </Link>
              </Card.Text>
            )}
            {!profileSelected.github && (
              <Card.Text>
                <Link to={`/profile/${profileId}/edit`}>Add Github </Link>
              </Card.Text>
            )}
          </div>
          <div id="social-link">
            {profileSelected.linkedin && (
              <Card.Text>
                <Link target="_blank" to={profileSelected.linkedin}>
                  Linkedin{" "}
                </Link>
              </Card.Text>
            )}
            {!profileSelected.linkedin && (
              <Card.Text>
                <Link to={`/profile/${profileId}/edit`}>Add Linkedin </Link>
              </Card.Text>
            )}
          </div>
        </Card.Body>
        {isLoggedIn && user.name === profileSelected.name && (
          <div id="profile-button-group">
            <Link to={`/profile/${profileId}/edit`}>
              <Button variant="secondary" id="update-button" size="sm">
                Update Profile
              </Button>
            </Link>
            <Button
              disabled
              onClick={handleDelete}
              variant="danger"
              id="delete-btn"
              size="sm"
            >
              Delete Profile
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
