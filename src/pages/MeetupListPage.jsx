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
  }, []);
  return (
    <div className="HomePage">
      <h2>Meetup</h2>
      {meetup &&
        meetup.map((singleMeetup) => {
          return (
            <div key={singleMeetup._id}>
              <h3>{singleMeetup.eventName}</h3>
              <img src={singleMeetup.imageUrl} alt={singleMeetup.eventName} />
              <p>{singleMeetup.eventType}</p>
              <p>{singleMeetup.eventDateAndTime}</p>
            </div>
          );
        })}
    </div>
  );
}

export default MeetupList;
