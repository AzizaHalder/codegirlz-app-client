import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventNewImage, setEventNewImage] = useState("");
  const [eventDateAndTime, setEventDateAndTime] = useState("");

  const navigate = useNavigate();

  //   handle file/image upload
  const handleImageUpload = (e) => {
    const uploadData = new FormData();

    // eventImage => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("eventImage", e.target.files[0]);

    service
      .uploadEventImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setEventNewImage(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the image: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeetupDetails = {
      eventName,
      eventType,
      eventCountry,
      eventCity,
      eventAddress,
      eventLink,
      eventDescription,
      eventNewImage,
      eventDateAndTime,
    };

    service
      .createMeetup(newMeetupDetails)
      .then((res) => {
        setEventName("");
        setEventType("");
        setEventCountry("");
        setEventCity("");
        setEventAddress("");
        setEventLink("");
        setEventDescription("");
        setEventNewImage("");
        setEventDateAndTime("");

        navigate("/meetup");
      })
      .catch((err) => console.log("Error while adding the new meetup: ", err));
  };

  return (
    <div>
      <h2>New Meetup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name of Meetup</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        {/* ENUM values --> Digital, In-Person */}
        <label htmlFor="">Type of Event</label>
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />

        {/* Need to get data from JSON file */}
        <label htmlFor="">Country</label>
        <input
          type="text"
          value={eventCountry}
          onChange={(e) => setEventCountry(e.target.value)}
        />
        {/* Need to get data from JSON file */}
        <label htmlFor="">City</label>
        <input
          type="text"
          value={eventCity}
          onChange={(e) => setEventCity(e.target.value)}
        />

        <label htmlFor="">Location</label>
        <input
          type="text"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.target.value)}
        />

        <label htmlFor="">Link to Meetup</label>
        <input
          type="text"
          value={eventLink}
          onChange={(e) => setEventLink(e.target.value)}
        />

        <label htmlFor="" placeholder="Give a brief description of the meetup">
          Description
        </label>
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        {/* Update this to show the calender with time and date */}
        <label htmlFor="">Select Time and Date</label>
        <input
          type="text"
          value={eventDateAndTime}
          onChange={(e) => setEventDateAndTime(e.target.value)}
        />

        <input type="file" onChange={(e) => handleImageUpload(e)} />
        <button type="submit">Submit New Meetup</button>
      </form>
    </div>
  );
};

export default AddEvent;
