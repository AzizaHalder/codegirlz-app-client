import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import service from "../api/service";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const EditResource = () => {
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceNewImage, setResourceNewImage] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [resourceContent, setResourceContent] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [podcastUpload, setPodcastUpload] = useState("");
  const [videoUpload, setVideoUpload] = useState("");

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
        setPodcastUpload(details.podcastUpload);
        setVideoUpload(details.videoUpload);
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
      podcastUpload,
      videoUpload,
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
        setPodcastUpload("");
        setVideoUpload("");
        navigate("/resource");
      })
      .catch((err) => console.log("Error while updating resource:", err));
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
      <Form className="edit-resource" onSubmit={handleSubmit}>
        <div className="col-md-6 edit-resource-content">
          <Form.Floating className="edit-margin">
            <Form.Control
              type="text"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
            <label className="form-label">Title</label>
          </Form.Floating>

          <Form.Floating className="edit-margin">
            <Form.Select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
            >
              <option value="" disabled selected>
                Select Resource Type
              </option>
              <option value="Article">Article</option>
              <option value="Podcast">Podcast</option>
              <option value="Video">Video</option>
            </Form.Select>
            <label className="form-label">Type of Resource</label>
          </Form.Floating>

          {resourceType === "Article" && (
            <>
              <Form.Floating className="edit-margin">
                <Form.Control
                  type="file"
                  id="img-upload"
                  onChange={(e) => handleImageUpload(e)}
                />
                <label className="form-label" id="update-img">
                  Update Image
                </label>
              </Form.Floating>

              <Form.Floating className="edit-margin">
                <Form.Control
                  type="url"
                  value={resourceURL}
                  onChange={(e) => setResourceURL(e.target.value)}
                />
                <label className="form-label">URL for Resource</label>
              </Form.Floating>
              <Form.Floating className="edit-margin">
                <Form.Control
                  placeholder="Add your article"
                  rows="10"
                  cols="30"
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label className="form-label">Article Content</label>
              </Form.Floating>
            </>
          )}

          {resourceType === "Podcast" && (
            <>
              <Form.Floating className="edit-margin">
                <Form.Control
                  type="url"
                  value={`https://open.spotify.com/embed/episode${podcastUpload}?utm_source=generator`}
                  onChange={(e) => setPodcastUpload(e.target.value)}
                />
                <label className="form-label">Upload Spotify Podcast URL</label>
              </Form.Floating>
              <Form.Floating className="edit-margin">
                <Form.Control
                  cols="30"
                  rows="3"
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label className="form-label">Description</label>
              </Form.Floating>
            </>
          )}

          {resourceType === "Video" && (
            <>
              <Form.Floating className="edit-margin">
                <Form.Control
                  type="url"
                  value={`https://www.youtube.com/embed/${videoUpload}`}
                  onChange={(e) => setVideoUpload(e.target.value)}
                />
                <label className="form-label">Upload Video URL</label>
              </Form.Floating>
              <Form.Floating className="edit-margin">
                <Form.Control
                  rows="3"
                  cols="30"
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label className="form-label">Description</label>
              </Form.Floating>
            </>
          )}

          <button type="submit">Submit Changes</button>
          <button onClick={handleDelete}>Delete Resource</button>
        </div>
      </Form>
    </div>
  );
};

export default EditResource;
