import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function MeetupDetails() {
  const [meetupSelected, setMeetup] = useState("");
  const { meetupId } = useParams();

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/meetup/${meetupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        console.log("The result is", result.data);
        setMeetup(result.data);
      });
  }, [meetupId]);

  if (meetupSelected) {
    return (
      <div className="meetup-details">
        <img src={meetupSelected.eventImage} alt={meetupSelected.eventName} />
        <h1>{meetupSelected.eventName}</h1>
        {/* author name not showing... ? */}
        {/* If I look in Mongo I don't see author when I create an event */}
        <p>Created by: {meetupSelected.author}</p>
        <h3>{meetupSelected.eventType}</h3>
        {/* add conditional logic for digital and in person events  */}
        <p>{meetupSelected.eventCountry}</p>
        <p>{meetupSelected.eventCity}</p>
        <p>{meetupSelected.eventAddress}</p>
        <p>{meetupSelected.eventLink}</p>
        <p>{meetupSelected.eventDateAndTime}</p>
        {/* add mapping over the array of attendees once atendees are added to the data  */}
        <p>{meetupSelected.attendees}</p>
        <Link to={`/meetup/edit/${meetupSelected._id}`}>
          <button>Edit Meetup</button>
        </Link>
      </div>
    );
  }
}

export default MeetupDetails;
