import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobCandidates = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const [jobCandidates, setJobCandidates] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/recruiter/job-candidates`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setJobCandidates(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleContact = () => {
    alert("Success! Message has been sent to user!");
  };

  return (
    <>
      <h1 className="page-title">JobCandidates</h1>

      <div className="candidates-list">
        {jobCandidates &&
          jobCandidates.map(
            ({ _id, name, level, profileImg, description, city }) => {
              return (
                <Card
                  className="candidates border-0"
                  key={_id}
                  style={{ width: "14rem" }}
                >
                  {profileImg.length === 0 ? (
                    <></>
                  ) : (
                    <img src={profileImg} alt={name} />
                  )}
                  <Card.Title>{name}</Card.Title>
                  {description.length === 0 ? (
                    <></>
                  ) : (
                    <Card.Text>{description}</Card.Text>
                  )}

                  {level.length === 0 ? (
                    <></>
                  ) : (
                    <Card.Footer>
                      <small className="text-muted">
                        {city} / {level}
                      </small>
                    </Card.Footer>
                  )}
                  {/* <Button id="profile-btn">
                    <Link to={`/profile/${_id}`}>See Profile</Link>
                  </Button> */}

                  <Link to={`/profile/${_id}`}>
                    <Button id="profile-btn">See Profile</Button>
                  </Link>

                  <Button id="contact-user-btn" onClick={handleContact}>
                    Contact User
                  </Button>
                </Card>
              );
            }
          )}
      </div>
    </>
  );
};

export default JobCandidates;
