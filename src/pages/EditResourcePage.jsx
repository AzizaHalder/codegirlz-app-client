import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";

const API_URL = "http://localhost:5005";

const EditResourcePage = () => {
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceNewImage, setResourceNewImage] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [resourceContent, setResourceContent] = useState("");
  const [resourceType, setResourceType] = useState("");
  //   author & comments?

  const { resourceId } = useParams();
  const navigate = useNavigate("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        // give variable a better name
        const details = res.data;
        setResourceTitle(details.resourceTitle);
        setResourceNewImage(details.resourceName);
        setResourceType(details.resourceType);
        setResourceURL(details.resourceURL);
        setResourceContent(details.resourceContent);
      })
      .catch((err) => console.log("Error while retrieving resource:", err));
  }, [resourceId]);

  const handleImageUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadResourceImage(uploadData)
      .then((res) => {
        console.log("response is: ", res.fileUrl);
        setResourceNewImage(res.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the image:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");
    const updatedResource = {
      resourceTitle,
      resourceImage: resourceNewImage,
      resourceURL,
      resourceContent,
      resourceType,
      //   author,
    };

    axios
      .put(`${API_URL}/resource/edit/${resourceId}`, updatedResource, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setResourceTitle("");
        setResourceNewImage("");
        setResourceType("");
        setResourceURL("");
        setResourceContent("");
        navigate("/resource");
      })
      .catch((err) => console.log("Error while updating resource", err));
  };

  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/resource/edit/${resourceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        alert("Your resource has been successfully deleted! ");
        navigate("/resource");
      })
      .catch((err) => console.log("Error while deleting resource: ", err));
  };

  return (
    <div className="EditResource">
      <h2>Edit Resource</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={resourceTitle}
          onChange={(e) => setResourceTitle(e.target.value)}
        />

        {/* <label htmlFor="">Upload Image</label> */}
        <input type="file" onChange={(e) => handleImageUpload(e)} />

        <label htmlFor="">Type of Resource</label>
        <select
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
        >
          <option value="" disabled selected>
            Select Resource Type
          </option>
          <option value="Article">Article</option>
          <option value="Podcast">Podcast</option>
          <option value="Video">Video</option>
        </select>

        <label htmlFor="">URL for Resource</label>
        <input
          type="text"
          value={resourceURL}
          onChange={(e) => setResourceURL(e.target.value)}
        />

        <label htmlFor="">Upload content of resource</label>
        <input
          type="text"
          value={resourceContent}
          onChange={(e) => setResourceContent(e.target.value)}
        />

        <button type="submit">Submit Changes</button>
        <button onClick={handleDelete}>Delete Resource</button>
      </form>
    </div>
  );
};

export default EditResourcePage;
