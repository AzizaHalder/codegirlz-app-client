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
      <div className="meetup-list">
        {attendEvent &&
          attendEvent.map(({ eventsAttended, _id }) => {
            return (
              <div className="card-save">
                <div
                  key={_id}
                  // className="border-0 bg-light"
                  id="saved-meetup-card"
                  style={{ width: "50%" }}
                  className="card-content"
                >
                  {eventsAttended.map((value) => (
                    <Card className="meetup-info border-0 bg-light">
                      <Link
                        to={`/meetup/${value._id}`}
                        className="more-details"
                      >
                        <img
                          src={value.eventImage}
                          alt={value.eventName}
                          className="card-img"
                        />
                        <Card.Title>{value.eventName}</Card.Title>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

export default AttendMeetup;
