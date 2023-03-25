import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import service from "../api/service";

const API_ORIGIN = "http://localhost:5005";

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

    // debugging error message: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_ORIGIN}/meetup/${meetupId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const oneMeetup = response.data;
                setEventName(oneMeetup.eventName)
                setEventType(oneMeetup.eventType);
                setEventCountry(oneMeetup.eventCountry);
                setEventCity(oneMeetup.eventCity)
                setEventAddress(oneMeetup.eventAddress)
                setEventLink(oneMeetup.eventLink)
                setEventDescription(oneMeetup.eventDescription)
                setEventNewImage(oneMeetup.eventNewImage)
                setEventDateAndTime(oneMeetup.eventDateAndTime)
            })
            .catch((error) => console.log(error));
    }, [meetupId]);






    //   handle file/image upload
    const handleImageUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        service
            .uploadEventImage(uploadData)
            .then((response) => {
                console.log("response is: ", response.fileUrl);
                setEventNewImage(response.fileUrl);

            })
            .catch((err) => console.log("Error while editing the image: ", err));
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
            .updateMeetup(newMeetupDetails)
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
            .catch((err) => console.log("Error while adding the new meetup: ", err));
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
                        type="url"
                        name="eventLink"
                        value={eventLink}
                        onChange={(e) => setEventLink(e.target.value)}
                    />

                    <label htmlFor="" placeholder="Give a brief description of the meetup">
                        Description
                    </label>
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

                    <input type="file" onChange={(e) => handleImageUpload(e)} />
                    <button type="submit">Submit New Meetup</button>
                </form>
            </div>
        </div>
    )
}

export default EditMeetUpPage;