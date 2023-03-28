import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const ResourceDetails = () => {
  const [resourceDetails, setResourceDetails] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { resourceId } = useParams();
  const { user } = useContext(AuthContext);

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setResourceDetails(res.data))
      .catch((err) =>
        console.log("Error while retrieving resource details:", err)
      );
  }, [resourceId]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/resource/${resourceId}/comment-list`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((commentList) => {
        setAllComments(commentList)
      })
      .catch((err) =>
        console.log("Error while getting array of comments", err)
      );
  }, [resourceId]);

  const handleSubmitComment = () => {
    const bodyComment = { resource: resourceId, user: user._id, comment };
    const storedToken = localStorage.getItem("authToken");
    axios.post(`${API_URL}/resource/${resourceId}/comment`, bodyComment, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
  };

  if (resourceDetails) {
    return (
      <article className="ResourceDetailsPage">
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
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmitComment}>Comment</button>
        <section>

          {/* allComments is not an array OR it needs conditional rendering because right now there is nothing in the array  */}
          {/* error message: all comments map is not a function  */}
          {allComments.map(({ author, createdAt, comment }) => {
            return (
              <div>
                {author}
                {comment}
                {createdAt}
              </div>
            )
          })}
        </section>
      </article>


    );
  }
};

export default ResourceDetails;
