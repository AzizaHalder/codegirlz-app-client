import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AttendMeetup() {
  const [attendEvent, setAttendEvent] = useState(null);

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/auth/attend`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setAttendEvent(res.data))
      .catch((err) =>
        console.log("Error while retrieving list of attending events", err)
      );
  }, []);

  console.log("Attending event", attendEvent);

  return (
    <>
      <h1>SavedMeetup</h1>
      {attendEvent &&
        attendEvent.map(({ eventsAttended, _id }) => {
          return (
            <div key={_id}>
              {eventsAttended.map((value) => (
                <Link to={`/meetup/${value._id}`}>
                  <>
                    <img src={value.eventImage} alt={value.eventName} />
                    <h3>{value.eventName}</h3>
                  </>
                </Link>
              ))}
            </div>
          );
        })}
    </>
  );
}

export default AttendMeetup;
