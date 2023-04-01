
import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../api/service";
import countries from "../countries.json";
import { AuthContext } from "../context/auth.context";

const AddMeetup = () => {
  const countryKeys = Object.keys(countries);
  // list of arrays of cities
  const cityArrayList = Object.values(countries);

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventNewImage, setEventNewImage] = useState("");
  const [eventDateAndTime, setEventDateAndTime] = useState("");
  const [city, setCity] = useState("");
  const [countryIndex, setCountryIndex] = useState(0);

  const navigate = useNavigate();
  const [address, setAddress] = useState();

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    fields: ["name"],
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleCity = (e) => setCity(e.target.value);
  const handleCountryIndex = (e) => setCountryIndex(e.target.value);

  //   handle file/image upload
  const handleImageUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("eventImage", e.target.files[0]);
    service
      .uploadEventImage(uploadData)
      .then((response) => {
        console.log("response is: ", response.fileUrl);
        setEventNewImage(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the image: ", err));
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setAddress(place.name);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeetupDetails = {
      eventName,
      eventType,
      eventCity: city,
      eventAddress: address,
      eventLink,
      eventDescription,
      eventImage: eventNewImage,
      eventDateAndTime,
      author: user._id,
    };

    service
      .createMeetup(newMeetupDetails)
      .then((res) => {
        setEventName("");
        setEventType("");
        setAddress();
        setEventLink("");
        setEventDescription("");
        setEventNewImage("");
        setEventDateAndTime("");
        setCity("");
        setCountryIndex(0);
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
        {eventType === "In-Person" && (
          <div>
            <select value={countryIndex} onChange={handleCountryIndex}>
              <option value="0">Select Country </option>
              {countryKeys.map((result, index) => (
                <option value={index}>{result}</option>
              ))}
            </select>
            <select value={city} onChange={handleCity}>
              <option>Select City</option>
              {cityArrayList[countryIndex].map((result) => (
                <option value={result}>{result}</option>
              ))}
            </select>

            <label htmlFor="">Address</label>
            <input ref={inputRef} value={address} type="text" />
          </div>

        };
   
        {eventType === "Digital" && (

          <div>
            <label htmlFor="">Link to Meetup</label>
            <input
              type="text"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
            />
          </div>
        )}
        <label
          htmlFor=""
          placeholder="Please Give a brief description of the meetup."
        >
          Description
        </label>
        <textarea
          rows="5"
          cols="30"
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

export default AddMeetup;
