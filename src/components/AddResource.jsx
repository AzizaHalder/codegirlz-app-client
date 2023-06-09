import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddResource = () => {
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceNewImage, setResourceNewImage] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [resourceContent, setResourceContent] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [videoUpload, setVideoUpload] = useState("");
  const [podcastUpload, setPodcastUpload] = useState("");
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();

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

    const newResource = {
      resourceTitle,
      resourceImage: resourceNewImage,
      resourceURL,
      resourceContent,
      resourceType,
      author: user._id,
      videoUpload,
      podcastUpload,
    };

    service
      .createResource(newResource)
      .then((res) => {
        setResourceTitle("");
        setResourceNewImage("");
        setResourceType("");
        setResourceURL("");
        setResourceContent("");
        navigate("/resource");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddResource">
      <h1 className="page-title">AddResource</h1>
      <Form className="add-resource" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <Form.Floating className="form-margin">
            <Form.Control
              type="text"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
            />
            <label htmlFor="">Title</label>
          </Form.Floating>
          <Form.Floating className="form-margin">
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
            <label htmlFor="">Type of Resource</label>
          </Form.Floating>

          {resourceType === "Article" && (
            <>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="file"
                  onChange={(e) => handleImageUpload(e)}
                />
                <label htmlFor="">Upload Image</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="url"
                  value={resourceURL}
                  onChange={(e) => setResourceURL(e.target.value)}
                />
                <label htmlFor="">URL for Resource</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label htmlFor="">Article Content</label>
              </Form.Floating>
            </>
          )}
          {resourceType === "Podcast" && (
            <>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="url"
                  onChange={(e) => setPodcastUpload(e.target.value)}
                />
                <label htmlFor="">Upload Spotify Podcast URL</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label htmlFor="">Description</label>
              </Form.Floating>
            </>
          )}

          {resourceType === "Video" && (
            <>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="url"
                  onChange={(e) => setVideoUpload(e.target.value)}
                />
                <label htmlFor="">Upload Video URL</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={resourceContent}
                  onChange={(e) => setResourceContent(e.target.value)}
                />
                <label htmlFor="">Description</label>
              </Form.Floating>
            </>
          )}
          <div>
            {errorMessage && (
              <p className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
          </div>

          <Button id="new-res-btn" variant="secondary" size="sm" type="submit">
            Add Resource
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddResource;
