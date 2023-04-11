import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import service from "../api/service";
import Button from "react-bootstrap/Button";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditMeetUp() {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventNewImage, setEventNewImage] = useState("");
  const [eventDateAndTime, setEventDateAndTime] = useState("");

  const { meetupId } = useParams();
  const navigate = useNavigate();

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
        setEventNewImage(oneMeetup.eventNewImage);
        setEventDateAndTime(oneMeetup.eventDateAndTime);
      })
      .catch((err) => console.log("Error while retrieving resource:", err));
  }, [meetupId]);

  const handleImageUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("eventImage", e.target.files[0]);

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

    const storedToken = localStorage.getItem("authToken");
    const updatedMeetup = {
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

    axios
      .put(`${API_URL}/meetup/edit/${meetupId}`, updatedMeetup, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
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
      .catch((err) => console.log("Error while editing meetup: ", err));
  };

  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/meetup/edit/${meetupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        alert("Your meetup has successfully been deleted! ");
        navigate("/meetup");
      })
      .catch((err) => console.log("Error while deleting meetup: ", err));
  };

  return (
    // <div>
    <div className="EditMeetup">
      <h1 className="page-title">Edit Meetup</h1>
      <Form className="edit-meetup" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <Form.Floating className="form-margin">
            <Form.Control
              type="text"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <label htmlFor="">Name of Meetup</label>
          </Form.Floating>
          <Form.Floating className="form-margin">
            <Form.Select
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
            </Form.Select>
            <label htmlFor="">Type of Event</label>
          </Form.Floating>
          {eventType === "In-Person" && (
            <>
              <Form.Floating className="form-margin">
                {/* Need to get data from JSON file */}
                <Form.Control
                  type="text"
                  name="eventCountry"
                  value={eventCountry}
                  onChange={(e) => setEventCountry(e.target.value)}
                />
                <label htmlFor="">Country</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                {/* Need to get data from JSON file */}
                <Form.Control
                  type="text"
                  name="eventCity"
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                />
                <label htmlFor="">City</label>
              </Form.Floating>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="text"
                  name="eventAddress"
                  value={eventAddress}
                  onChange={(e) => setEventAddress(e.target.value)}
                />
                <label htmlFor="">Address</label>
              </Form.Floating>
            </>
          )}

          {eventType === "Digital" && (
            <>
              <Form.Floating className="form-margin">
                <Form.Control
                  type="text"
                  name="eventLink"
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                />
                <label htmlFor="">Link to Meetup</label>
              </Form.Floating>
            </>
          )}
          <Form.Floating className="form-margin">
            <Form.Control
              as="textarea"
              rows={5}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <label
              htmlFor=""
              placeholder="Please Give a brief description of the meetup."
            >
              Description
            </label>
          </Form.Floating>
          <Form.Floating className="form-margin">
            <Form.Control
              type="datetime-local"
              name="eventDateAndTime"
              value={eventDateAndTime}
              onChange={(e) => setEventDateAndTime(e.target.value)}
            />
            <label htmlFor="">Select Time and Date</label>
          </Form.Floating>
          <Form.Floating className="form-margin">
            {/* Should we add a spinner here so that people know that the image is still loading, seems to take a while sometimes, can be this be solved by async await server side */}
            <input
              type="file"
              name="eventNewImage"
              // How do we prepopulate the image field
              onChange={(e) => handleImageUpload(e)}
            />
          </Form.Floating>
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            id="edit-meetup-btn"
          >
            Submit Changes
          </Button>
          <Button
            variant="danger"
            id="delete-meetup-btn"
            size="sm"
            onClick={handleDelete}
          >
            Delete Meetup
          </Button>
        </div>
      </Form>
    </div>
    // </div>
  );
}

export default EditMeetUp;
