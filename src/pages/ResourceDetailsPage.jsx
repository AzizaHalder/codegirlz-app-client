import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const ResourceDetails = () => {



  const [resourceDetails, setResourceDetails] = useState("");
  const [oneComment, setOneComment] = useState("");
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
        setAllComments(commentList.data)
      })
      .catch((err) =>
        console.log("Error while getting array of comments", err)
      );
  }, [resourceId]);

  const handleSubmitComment = () => {
    const bodyComment = { resource: resourceId, user: user._id, comment: oneComment };
    const storedToken = localStorage.getItem("authToken");
    axios.post(`${API_URL}/resource/${resourceId}/comment`, bodyComment, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    setOneComment(bodyComment.comment);
  };


  if (resourceDetails) {
    return (
      <article className="ResourceDetailsPage">
        <Link to={`/resource/edit/${resourceId}`}>
          <button>Edit {resourceDetails.resourceType}</button>
        </Link>
        <h1>{resourceDetails.resourceTitle}</h1>
        <img
          src={resourceDetails.resourceImage}
          alt={resourceDetails.resourceTitle}
        />
        <p>{resourceDetails.resourceContent}</p>
        <p>{resourceDetails.resourceURL}</p>
        <p>{resourceDetails.resourceType}</p>
        <div style={{ width: '70%' }}>
          <h6>Write a comment</h6>
          <textarea rows="4" cols="50" placeholder="Comment" value={oneComment} onChange={(e) => setOneComment(e.target.value)}>
          </textarea>
          <button style={{ marginTop: '10px' }} onClick={handleSubmitComment}>Comment</button>
        </div>
        <section>

          {allComments.map(({ author, createdAt, comment }) => {
            return (
              <div>
                <p>{author.name}</p>
                <p>{comment}</p>
                <p>{createdAt}</p>
              </div>
            )
          })}
        </section>
      </article>


    );
  }
};

export default ResourceDetails;
