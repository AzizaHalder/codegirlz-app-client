import { useContext } from 'react'
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";



function MyResources() {
    const { user } = useContext(AuthContext);
    const [savedResource, setSavedResource] = useState(null);

    const API_URL = `http://localhost:5005`;


    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_URL}/auth/save`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => setSavedResource(res.data))
            .catch((err) =>
                console.log("Error while retrieving saved resources details:", err)
            );
    }, []);

    console.log(`This is the saved resource:`, savedResource)
    // console.log(`This is the saved resource:`, savedResource[0].myResource[0].resourceTitle)

    return (
        <div>

            <h1>MyResources</h1>

            {savedResource && savedResource.map(({ myResource, _id }) => {

                return (
                    <div key={_id}>{myResource.map((value) =>

                        (<p>This is the value: {value.resourceTitle}</p>)

                    )}</div>
                )
            })}
        </div>

    )
}

export default MyResources
