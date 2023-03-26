import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ResourceDetailsPage = () => {
  const [resourceDetails, setResourceDetails] = useState("");
  const { resourceId } = useParams();

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setResourceDetails(res.data))
      .catch((err) => console.log("Error retrieving resource details:", err));
  }, [resourceId]);

  if (resourceDetails) {
    return (
      <div className="ResourceDetailsPage">
        <h1>{resourceDetails.resourceTitle}</h1>
        <img
          src={resourceDetails.resourceImage}
          alt={resourceDetails.resourceTitle}
        />
        <p>{resourceDetails.resourceContent}</p>
        <p>{resourceDetails.resourceURL}</p>
        <p>{resourceDetails.resourceType}</p>
        <Link to={`/resource/edit/${resourceId}`}>
          <button>Edit {resourceDetails.resourceType}</button>
        </Link>
      </div>
    );
  }
};

export default ResourceDetailsPage;
