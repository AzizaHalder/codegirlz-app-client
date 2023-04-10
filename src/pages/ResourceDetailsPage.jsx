import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

const ResourceDetails = () => {
  const [resourceDetails, setResourceDetails] = useState("");
  const [oneComment, setOneComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  console.log(resourceDetails);

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
      <Container className="ResourceDetailsPage">
        <div className="resource-content">
          {resourceDetails.resourceType === "Article" && (
            <>
              <h1 className="page-title">{resourceDetails.resourceTitle}</h1>
              <img
                className="resource-img"
                src={resourceDetails.resourceImage}
                alt={resourceDetails.resourceTitle}
              />
              <p className="article-content">
                {resourceDetails.resourceContent}
              </p>
              <p className="article-url">
                <strong>Source:</strong> {resourceDetails.resourceURL}
              </p>
            </>
          )}

          {resourceDetails.resourceType === "Podcast" && (
            <>
              <h1 className="page-title">{resourceDetails.resourceTitle}</h1>
              <iframe
                className="podcast-display"
                loading="lazy"
                src={`https://open.spotify.com/embed/episode${resourceDetails.podcastUpload}?utm_source=generator`}
                title="Spotify podcast"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <p className="resource-podcast">
                {resourceDetails.resourceContent}
              </p>
            </>
          )}

          {resourceDetails.resourceType === "Video" && (
            <>
              <h1 className="page-title">{resourceDetails.resourceTitle}</h1>

              <iframe
                className="video-display"
                src={`https://www.youtube.com/embed/${resourceDetails.videoUpload}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <p className="resource-video">
                {resourceDetails.resourceContent}
              </p>
            </>
          )}

          <div className="resource-info">
            {user._id === resourceDetails.author && (
              <Link to={`/resource/edit/${resourceId}`}>
                <Button
                  className="info"
                  variant="secondary"
                  size="sm"
                  id="edit-btn"
                >
                  Edit {resourceDetails.resourceType}
                </Button>
              </Link>
            )}
            <Button
              className="bg-transparent border-0 "
              title="save / unsave resource"
              value={saved}
              onClick={() => handleSave(resourceDetails._id)}
            >
              {saved === true && (
                <FontAwesomeIcon
                  className="info"
                  icon={faBookmark}
                  size="lg"
                  style={{ color: "#81b4a6" }}
                />
              )}

              {saved === false && (
                <FontAwesomeIcon
                  className="info"
                  icon={faFileCirclePlus}
                  size="lg"
                  style={{ color: "#1a6a68" }}
                />
              )}
            </Button>
          </div>

          <div className="leave-comment" style={{ width: "70%" }}>
            <textarea
              rows="3"
              cols="60"
              placeholder="Leave a comment"
              value={oneComment}
              onChange={(e) => setOneComment(e.target.value)}
            ></textarea>

            <Button
              variant="secondary"
              size="sm"
              id="comment-btn"
              onClick={handleSubmitComment}
            >
              Comment
            </Button>
          </div>
          <section>
            {allComments.map(({ author, createdAt, comment }) => {
              return (
                <div className="comments-user">
                  <p>
                    <img
                      className="comments-img"
                      src={author.profileImg}
                      alt={author.name}
                    />{" "}
                    <strong>{author.name}:</strong> {comment}
                  </p>
                  {/* <br /> */}
                  <small>{createdAt}</small>
                </div>
              );
            })}
          </section>
        </div>
      </Container>
    );
  }
};

export default ResourceDetails;
