import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ResourceDetails = () => {
  const [resourceDetails, setResourceDetails] = useState("");
  const [oneComment, setOneComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const [saved, setSaved] = useState(false);

  const { resourceId } = useParams();
  const { user } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setResourceDetails(res.data);
        console.log(res.data);
      })
      .catch((err) =>
        console.log("Error while retrieving resource details:", err)
      );
  }, [resourceId]);

  const displayComments = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}/comment-list`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((commentList) => {
        setAllComments(commentList.data);
      })
      .catch((err) =>
        console.log("Error while getting array of comments", err)
      );
  };

  useEffect(() => {
    displayComments();
  }, [resourceId]);

  const handleSubmitComment = () => {
    const bodyComment = {
      resource: resourceId,
      user: user._id,
      comment: oneComment,
    };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/resource/${resourceId}/comment`, bodyComment, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        displayComments();
        setOneComment("");
      })
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/resource/${resourceId}/save`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => setSaved(!saved))
      .catch((err) => console.log("Error while trying to attend meetup:", err));
  };

  if (resourceDetails) {
    return (
      <article className="ResourceDetailsPage">
        <Link to={`/resource/edit/${resourceId}`}>
          <button>Edit {resourceDetails.resourceType}</button>
        </Link>
        <button
          title="save / unsave resource"
          value={saved}
          onClick={() => handleSave(resourceDetails._id)}
        >
          {saved === true && (
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="lg"
              style={{ color: "#32612d" }}
            />
          )}

          {saved === false && (
            <FontAwesomeIcon
              icon={faBookmark}
              size="lg"
              style={{ color: "#32612d" }}
            />
          )}
        </button>

        {resourceDetails.resourceType === "Article" && (
          <>
            <h1>{resourceDetails.resourceTitle}</h1>
            <img
              src={resourceDetails.resourceImage}
              alt={resourceDetails.resourceTitle}
            />
            <p>{resourceDetails.resourceContent}</p>
            <p>{resourceDetails.resourceURL}</p>
            <p>{resourceDetails.resourceType}</p>
          </>
        )}

        {resourceDetails.resourceType === "Podcast" && (
          <>
            <h1>{resourceDetails.resourceTitle}</h1>
            <iframe
              loading="lazy"
              width="560"
              height="315"
              src={`https://open.spotify.com/embed/episode${resourceDetails.podcastUpload}?utm_source=generator`}
              title="Spotify podcast"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <p>{resourceDetails.resourceContent}</p>
            <p>{resourceDetails.resourceType}</p>
          </>
        )}

        {resourceDetails.resourceType === "Video" && (
          <>
            <h1>{resourceDetails.resourceTitle}</h1>
            <p>{resourceDetails.videoUpload}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${resourceDetails.videoUpload}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <p>{resourceDetails.resourceContent}</p>
            <p>{resourceDetails.resourceType}</p>
          </>
        )}

        <div className="LeaveComment" style={{ width: "70%" }}>
          <h6>Leave a comment</h6>
          <textarea
            rows="4"
            cols="50"
            placeholder="Comment"
            value={oneComment}
            onChange={(e) => setOneComment(e.target.value)}
          ></textarea>

          <button style={{ marginTop: "10px" }} onClick={handleSubmitComment}>
            Comment
          </button>
        </div>
        <section>
          {allComments.map(({ author, createdAt, comment }) => {
            return (
              <div>
                {/* <p>{author.name}</p> */}
                <p>{comment}</p>
                <p>{createdAt}</p>
              </div>
            );
          })}
        </section>
      </article>
    );
  }
};

export default ResourceDetails;
