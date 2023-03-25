import React, { useState, useEffect } from "react";
import service from "../api/service";

function MeetupList() {
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    service
      .getAllMeetup()
      .then((data) => {
        setMeetup(data);
      })
      .catch((err) => console.log(err));
  }, []); //effect runs once after initial render
  return (
    <div className="MeetupList">
      <h2>Meetup</h2>
      {meetup &&
        meetup.map((singleMeetup) => {
          return (
            <div key={singleMeetup._id}>
              <h3>{singleMeetup.eventName}</h3>
              <img src={singleMeetup.eventImage} alt={singleMeetup.eventName} width="200" />
              <p>{singleMeetup.eventType}</p>
              <p>{singleMeetup.eventDateAndTime}</p>
            </div>
          )
        })}
    </div>
  );
}

export default MeetupList;
