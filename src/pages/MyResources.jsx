import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyResources() {
  const { user } = useContext(AuthContext);
  const [savedResource, setSavedResource] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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

  console.log(`This is the saved resource:`, savedResource);

  return (
    <div>
      <h1>SavedResources</h1>

      {savedResource &&
        savedResource.map(({ myResource, _id }) => {
          return (
            <div key={_id}>
              {myResource.map((value) => (
                <Link to={`/resource/${value._id}`}>
                  <>
                    <img src={value.resourceImage} alt={value.resourceTitle} />
                    <h3> {value.resourceTitle}</h3>
                  </>
                </Link>
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default MyResources;
