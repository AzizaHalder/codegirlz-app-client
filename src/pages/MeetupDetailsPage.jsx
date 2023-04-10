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
        <img src={meetupSelected.eventImage} alt={meetupSelected.eventName} />
        <h1 className="page-title">{meetupSelected.eventName}</h1>

        {/*
        - When creating a meetup, cannot retrieve author
         <p>Created by: {meetupSelected.author?.name}</p> 
         */}
        <h3>{meetupSelected.eventType}</h3>
        <p>{meetupSelected.eventCountry}</p>
        <p>{meetupSelected.eventCity}</p>
        <p>{meetupSelected.eventAddress}</p>
        <p>{meetupSelected.eventLink}</p>
        <p>{meetupSelected.eventDateAndTime}</p>
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
        <p>{meetupSelected.attendees}</p>
        {user._id === meetupSelected.author && (
          <Link to={`/meetup/edit/${meetupSelected._id}`}>
            <Button variant="secondary" size="sm" id="edit-meetup-btn">
              Edit Meetup
            </Button>
          </Link>
        )}
      </Container>
    );
  }
}

export default MeetupDetails;
