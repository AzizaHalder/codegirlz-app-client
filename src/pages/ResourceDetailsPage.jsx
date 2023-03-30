import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Comment from '../components/Comment'

const ResourceDetails = () => {



  const [resourceDetails, setResourceDetails] = useState("");
  const [oneComment, setOneComment] = useState(""); // works and stores the comment
  const [allComments, setAllComments] = useState(); // what is allComments - is this an object? yes it's an object
  // const [commentIndex, setCommentIndex] = useState(0);



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
      .then((commentList) => { //commentList.data is an object 
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

  // let commentList = Object.assign({}, allComments) // copy of allComments object 
  // // console.log(commentList)

  // let commentsArray = Object.values(commentList) // copy of the second object 
  // console.log(commentsArray)

  // let commentsArray2 = Object.values(commentsArray) // finally an array to map 
  // console.log(commentsArray2)





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
        <Comment post={oneComment} />
        {/* <input
          type="text"
          value={oneComment}
          onChange={(e) => setOneComment(e.target.value)}
        />
        <button onClick={handleSubmitComment}>Comment</button> */}
        {/* <section> */}
        {/* <p>Your comment: {oneComment}</p> */}

        {/* <p>Your List of comments: {allComments}</p> */}

        {/* {listOfComments.map((comment, index) => {
            return (
              <div key={index}>{comment}</div>
            )
          })} */}


        {/* allComments is not an array OR it needs conditional rendering because right now there is nothing in the array  */}
        {/* error message: all comments map is not a function  */}
        {/* {allComments.map(({ author, createdAt, comment }) => {
            return (
              <div>
                {author}
                {comment}
                {createdAt}
              </div>
            )
          })} */}

        {/* {
            commentsArray.map((value, index) => {
              return (
                <p>{value.comment}{index}</p>
              )
            })
          } */}





        {/* </section> */}

      </article>


    );
  }
};

export default ResourceDetails;
