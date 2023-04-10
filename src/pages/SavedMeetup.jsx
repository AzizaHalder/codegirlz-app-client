import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";

function AttendMeetup() {
  const [attendEvent, setAttendEvent] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/meetup/attend`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setAttendEvent(res.data))
      .catch((err) =>
        console.log("Error while retrieving list of attending events", err)
      );
  }, []);

  console.log("Attending event", attendEvent);

  return (
    <Container className="SavedMeetup">
      <h1 className="page-title">SavedMeetup</h1>
      <div className="all-cards">
        {attendEvent &&
          attendEvent.map(({ eventsAttended, _id }) => {
            return (
              <Card key={_id} className="border-0 card-list bg-light">
                {eventsAttended.map((value) => (
                  <div className="card-content">
                    <Link to={`/meetup/${value._id}`} className="more-details">
                      <img
                        src={value.eventImage}
                        alt={value.eventName}
                        className="card-img"
                      />
                      <Card.Title>{value.eventName}</Card.Title>
                    </Link>
                  </div>
                ))}
              </Card>
            );
          })}
      </div>
    </Container>
  );
}

export default AttendMeetup;
