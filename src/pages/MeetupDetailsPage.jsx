import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarPlus,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

function MeetupDetails() {
  const [meetupSelected, setMeetup] = useState("");
  const [attendMeetup, setAttendMeetup] = useState(false);

  const { meetupId } = useParams();
  const { user } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/meetup/${meetupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        console.log("The result is", result.data);
        setMeetup(result.data);
      })
      .catch((err) =>
        console.log("Error while retrieving meetup details:", err)
      );
  }, [meetupId]);

  const handleSave = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/meetup/${meetupId}/attend`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => setAttendMeetup(!attendMeetup))
      .catch((err) => console.log("Error while trying to save resource:", err));
  };

  if (meetupSelected) {
    return (
      <Container className="meetup-details">
        <h1 className="page-title">Meetup Details</h1>
        <div id="left" className="meetup">
          <img
            id="meetup-img"
            src={meetupSelected.eventImage}
            alt={meetupSelected.eventName}
          />
        </div>
        <div className="meetup meetup-info" id="right">
          <h5>{meetupSelected.eventType}</h5>
          <h2>{meetupSelected.eventName}</h2>
          <p>Created by: {user.name}</p>

          {meetupSelected.eventType === "Digital" && (
            <p>{meetupSelected.eventLink}</p>
          )}
          {meetupSelected.eventType === "In-Person" && (
            <div>
              <div className="meetup-location">
                <p>
                  <strong>Time and Location</strong>
                </p>
              </div>
              <div className="meetup-location">
                <p>
                  {meetupSelected.eventCountry} | {meetupSelected.eventCity} |
                  {meetupSelected.eventAddress}
                </p>
                <p>{meetupSelected.eventDateAndTime}</p>
              </div>
            </div>
          )}
          {/* add mapping over the array of attendees once atendees are added to the data  */}

          <Button
            className="bg-transparent border-0"
            title="attend / unattend meetup"
            value={attendMeetup}
            onClick={() => handleSave(meetupSelected._id)}
          >
            {attendMeetup === true && (
              <FontAwesomeIcon
                icon={faCalendar}
                size="lg"
                style={{ color: "#1a6a68" }}
              />
            )}

            {attendMeetup === false && (
              <FontAwesomeIcon
                icon={faCalendarPlus}
                size="lg"
                style={{ color: "#81b4a6" }}
              />
            )}
          </Button>
          <p>Hosted by: {user.name}</p>
          <p>{meetupSelected.attendees}</p>
          {user._id === meetupSelected.author && (
            <Link to={`/meetup/edit/${meetupSelected._id}`}>
              <Button variant="secondary" size="sm" id="meetup-changes-btn">
                Edit Meetup
              </Button>
            </Link>
          )}
        </div>
      </Container>
    );
  }
}

export default MeetupDetails;
