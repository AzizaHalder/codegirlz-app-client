import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";

// Changed this from API_ORIGIN to API_URL for consistency; in the rest of our app we were using API_URL
const API_URL = "http://localhost:5005";

// do we need props in the the below function...?
function EditMeetUpPage(props) {
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
  const { meetupId } = useParams();
  console.log("NewImage", eventNewImage);

  // debugging error message: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/meetup/${meetupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneMeetup = response.data;
        setEventName(oneMeetup.eventName);
        setEventType(oneMeetup.eventType);
        setEventCountry(oneMeetup.eventCountry);
        setEventCity(oneMeetup.eventCity);
        setEventAddress(oneMeetup.eventAddress);
        setEventLink(oneMeetup.eventLink);
        setEventDescription(oneMeetup.eventDescription);
        // changed name to eventImage vs eventNewImage
        // When I got the updated changes to save for the rest of the form,
        // updating the image was throwing an error, hence the change
        setEventNewImage(oneMeetup.eventImage);
        setEventDateAndTime(oneMeetup.eventDateAndTime);
        console.log("Axios GET one Meetup", response.data);
      })
      .catch((error) => console.log(error));
  }, [meetupId]);

  // handle file/image upload
  const handleImageUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadEventImage(uploadData)
      .then((response) => {
        console.log("response is: ", response.fileUrl);
        setEventNewImage(response.fileUrl);
      })
      .catch((err) => console.log("Error while editing image: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMeetupDetails = {
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

    // Submitting edited changes isn't working (I don't remember if we tested this together or not,
    // was so focused on having the form pre populated!)
    // If, I change this from Service to Axios it works..
    // But I guess this won't delete the image from CLoudinary?
    service
      // Do we need dynamic URL here, as a second parameter to updateMeetup?
      // `${API_URL}/meetup/edit/${meetupId}`,
      .updateMeetup(updatedMeetupDetails)
      .then((response) => {
        setEventName("");
        setEventType("");
        setEventCountry("");
        setEventCity("");
        setEventAddress("");
        setEventLink("");
        setEventDescription("");
        setEventNewImage("");
        setEventDateAndTime("");
        console.log("THIS IS THE RESPONSE", response.data);

        navigate(`/meetup/${meetupId}`);
      })
      .catch((err) => console.log("Error editing meetup: ", err));
  };

  const handleDelete = () => {
    service
      .deleteMeetup(`${API_URL}/meetup/edit/delete/${meetupId}`)
      .then(() => {
        navigate("/meetup");
      })
      .catch((err) => console.log("Error deleting meetup: ", err));
  };

  return (
    <div>
      <div>
        <h2>Edit Meetup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Name of Meetup</label>
          <input
            type="text"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <label htmlFor="">Type of Event</label>
          <select
            id="eventTypes"
            name="eventType"
            value={eventType}
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
            name="eventCountry"
            value={eventCountry}
            onChange={(e) => setEventCountry(e.target.value)}
          />
          {/* Need to get data from JSON file */}
          <label htmlFor="">City</label>
          <input
            type="text"
            name="eventCity"
            value={eventCity}
            onChange={(e) => setEventCity(e.target.value)}
          />

          <label htmlFor="">Address</label>
          <input
            type="text"
            name="eventAddress"
            value={eventAddress}
            onChange={(e) => setEventAddress(e.target.value)}
          />

          <label htmlFor="">Link to Meetup</label>
          <input
            type="text"
            name="eventLink"
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
          />

          <label
            htmlFor=""
            placeholder="Give a brief description of the meetup"
          >
            Description
          </label>

          {/* Made this into a textarea but then in the edit mode, it doesn't show prepopulated */}
          <input
            type="text"
            name="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />

          <label htmlFor="">Select Time and Date</label>
          <input
            type="datetime-local"
            name="eventDateAndTime"
            value={eventDateAndTime}
            onChange={(e) => setEventDateAndTime(e.target.value)}
          />

          {/* Should we add a spinner here so that people know that the image is still loading, seems to take a while sometimes */}
          <input
            type="file"
            name="eventNewImage"
            // was wondering if we could set the value of the image,
            // but when I tried that didn't work and it gave me an error
            // value={eventNewImage}
            onChange={(e) => handleImageUpload(e)}
          />
          <button type="submit">Submit Changes</button>
          <button onClick={handleDelete}>Delete Meetup</button>
        </form>
      </div>
    </div>
  );
}

export default EditMeetUpPage;
