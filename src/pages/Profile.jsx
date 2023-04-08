import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





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
            <div>{profileSelected.name}</div>
        )
    }
}

export default Profile;