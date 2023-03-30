import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";

const Comment = () => {

    const [comments, setComments] = useState([]);
    const [oneComment, setOneComment] = useState("");
    const { resourceId } = useParams();
    const { user } = useContext(AuthContext);


    const API_URL = `http://localhost:5005`;


    const handleSubmitComment = () => {
        const bodyComment = { resource: resourceId, user: user._id, comment: oneComment };
        const storedToken = localStorage.getItem("authToken");
        axios.post(`${API_URL}/resource/${resourceId}/comment`, bodyComment, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setOneComment(bodyComment.comment);
        comments.push(oneComment);
        console.log(comments);
        setComments(comments);
    };

    return (
        <div>
            <div className="comments-outer-container">
                <div style={{ width: '70%' }}>
                    <h6>Write a comment</h6>
                    <textarea rows="4" cols="50" placeholder="Comment" value={oneComment} onChange={(e) => setOneComment(e.target.value)}>
                    </textarea>
                    <button style={{ marginTop: '10px' }} onClick={handleSubmitComment}>Comment</button>
                </div>
                <div className="comments-inner-container">
                    <h6>Comments</h6>
                    {comments.map((c, i) => (
                        <p key={i}>{c}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Comment;