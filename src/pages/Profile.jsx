import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';





function Profile() {
    const [profileSelected, setProfile] = useState("");

    const { profileId } = useParams();
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
                console.log("Error while retrieving meetup details:", err)
            );
    }, [profileId]);

    if (profileSelected) {
        return (
            <div id="profile-container"><Card style={{ width: '30rem' }} id="profile-page">
                <Card.Img variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680978855/code-girlz/circle-dog_jk4sag.png" style={{ width: '15rem' }} />
                <Card.Body>
                    <Card.Title>{profileSelected.name}</Card.Title>
                    <Card.Text>
                        Add some details about yourself. Share more information about your interests or skills for recruiters to see.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>City: {profileSelected.city}</ListGroup.Item>
                    <ListGroup.Item>Level: {profileSelected.level}</ListGroup.Item>
                    <ListGroup.Item>Open to new opportunities?<br></br>{profileSelected.newOpp === true ? <p>Yes!</p> : <p>Not yet..</p>}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Text>Social Links:</Card.Text>
                    <Card.Link href="#">Add your Github Link</Card.Link>
                    <Card.Link href="#">Add your LinkedIn page</Card.Link>
                </Card.Body>
            </Card></div>
        )
    }
}

export default Profile;