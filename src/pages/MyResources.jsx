import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
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
    <div className="SavedResources">
      <h1>SavedResources</h1>
      <div className="all-cards">
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
                <Card
                  key={_id}
                  className="border-0 card-list bg-light"
                  style={{ width: "250px" }}
                >
                  <div className="card-content">
                    <Link to={`/resource/${_id}`} className="more-details">
                      <>
                        <Card.Title> {resourceTitle}</Card.Title>

                        {resourceType === "Article" && (
                          <img
                            src={resourceImage}
                            alt={resourceTitle}
                            className="card-img"
                          />
                        )}

                        {resourceType === "Video" && (
                          <iframe
                            title="Youtube video player"
                            src={`https://www.youtube.com/embed/${videoUpload}`}
                            className="card-video"
                          ></iframe>
                        )}
                        {resourceType === "Podcast" && (
                          <iframe
                            className="podcast-thumbnail"
                            title="Spotify Podcast"
                            src={`https://open.spotify.com/embed/episode${podcastUpload}?utm_source=generator`}
                          ></iframe>
                        )}
                        <p>{resourceType}</p>
                      </>
                    </Link>
                  </div>
                </Card>
              );
            }
          )}
      </div>
    </div>
  );
}

export default MyResources;
