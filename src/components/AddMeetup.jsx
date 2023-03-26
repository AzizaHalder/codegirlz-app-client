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
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadEventImage(uploadData)
      .then((response) => {
        console.log("response is: ", response.fileUrl);
        // response carries "fileUrl" which we can use to update the state
        setEventNewImage(response.fileUrl);
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
      eventImage: eventNewImage,
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
        console.log("RES", res);

        navigate("/meetup");
      })
      .catch((err) => console.log("Error while adding new meetup: ", err));
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

        <label htmlFor="">Type of Event</label>
        <select
          id="eventTypes"
          name={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="" disabled selected>
            Select Event Type
          </option>
          <option value="Digital">Digital</option>
          <option value="In-Person">In-Person</option>
        </select>

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

        <label htmlFor="">Address</label>
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
        {/* Made this into a textarea but then in the edit mode, it doesn't show prepopulated */}
        {/* <textarea
          name="eventDescription"
          id=""
          // placeholder="Give a brief description of event "
          cols="20"
          rows="10"
          onChange={(e) => setEventDescription(e.target.value)}
        /> */}
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        <label htmlFor="">Select Time and Date</label>
        <input
          type="datetime-local"
          value={eventDateAndTime}
          onChange={(e) => setEventDateAndTime(e.target.value)}
        />

        {/* Can we add a spinner here so that people know that the image is still loading, seems to take a while sometimes */}
        <input
          type="file"
          // value={eventNewImage}
          onChange={(e) => handleImageUpload(e)}
        />
        <button type="submit">Submit New Meetup</button>
      </form>
    </div>
  );
};

export default AddEvent;
