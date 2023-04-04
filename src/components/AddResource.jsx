import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";
import { AuthContext } from "../context/auth.context";

const AddResource = () => {
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceNewImage, setResourceNewImage] = useState("");
  const [resourceURL, setResourceURL] = useState("");
  const [resourceContent, setResourceContent] = useState("");
  const [resourceType, setResourceType] = useState("");
  const { user } = useContext(AuthContext);

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
        console.log("RES from service", res);
      })
      .catch((err) => console.log("Error while creating new resource:", err));
  };

  return (
    <div className="AddResource">
      <h2>Upload a Resource</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={resourceTitle}
          onChange={(e) => setResourceTitle(e.target.value)}
        />
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
          onChange={(e) => console.log(e.target.value)}
        />

        {resourceType === "Video" ? (
          <>
            <video
              controls
              width={250}
              src={"https://www.youtube.com/watch?v=zE-a5eqvlv8"}
              type="video/youtube"
              crossOrigin="anonymous"
            ></video>
          </>
        ) : (
          <>
            <label htmlFor="">Description</label>
            <textarea
              rows="5"
              cols="30"
              value={resourceContent}
              onChange={(e) => setResourceContent(e.target.value)}
            />
          </>
        )}

        <label htmlFor="">Upload Image</label>
        <input type="file" onChange={(e) => handleImageUpload(e)} />
        <button type="submit">Upload New Resource</button>
      </form>
    </div>
  );
};

export default AddResource;
