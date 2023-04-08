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
      .get(`${API_URL}/resource/save`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        // console.log("this is the axios response", res.data.myResource);
        setSavedResource(res.data.myResource);
      })
      .catch((err) =>
        console.log("Error while retrieving saved resources details:", err)
      );
  }, []);

  console.log(`This is the saved resource:`, savedResource);

  return (
    <div>
      <h1>SavedResources</h1>

      {savedResource &&
        savedResource.map(
          ({
            podcastUpload,
            _id,
            resourceImage,
            resourceTitle,
            resourceType,
            videoUpload,
          }) => {
            return (
              <div key={_id}>
                <Link to={`/resource/${_id}`}>
                  <>
                    <img src={resourceImage} alt={resourceTitle} />
                    <h3> {resourceTitle}</h3>
                    <h3>{resourceType}</h3>
                    {resourceType === "Article" && (
                      <iframe
                        title="Youtube video player"
                        src={`https://www.youtube.com/embed/${videoUpload}`}
                      ></iframe>
                    )}
                    {resourceType === "Podcast" && (
                      <iframe
                        title="Spotify Podcast"
                        src={`https://open.spotify.com/embed/episode${podcastUpload}?utm_source=generator`}
                      ></iframe>
                    )}
                  </>
                </Link>
              </div>
            );
          }
        )}
    </div>
  );
}

export default MyResources;
