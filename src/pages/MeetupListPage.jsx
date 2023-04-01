import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import service from "../api/service";

function MeetupList() {
  const [meetupList, setMeetupList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // Attend a meetup
  const [userInfo, setUserInfo] = useState(false);

  const { user } = useContext(AuthContext);

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    service
      .getAllMeetup()
      .then((data) => {
        setMeetupList(data);
        setSearchResults(data);
        return service.getUserInfo();
      })
      .then((user) => setUserInfo(user))
      .catch((err) => console.log("Error while retrieving meetup list:", err));
  }, []); //effect runs once after initial render

  const handleQuery = (searchTerm) => {
    const meetupToSearch = [...meetupList];
    const searchQuery = meetupToSearch.filter((meetup) =>
      meetup.eventName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setSearchResults(searchQuery);
  };

  const handleFilter = (type) => {
    if (type === "All") {
      setSearchResults(meetupList);
    } else {
      const filtered = meetupList.filter((meetup) => meetup.eventType === type);
      setSearchResults(filtered);
    }
  };

  const handleSave = (meetupId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/auth/${meetupId}/attend`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        },
        console.log(`${API_URL}/auth/${meetupId}/attend`)
      )
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log("Error while trying to attend meetup", err));
    // setSaved(true);
  };

  return (
    <div className="MeetupList">
      <h2>Meetup</h2>

      <SearchBar onQuery={handleQuery} />

      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value={"All"}>All</option>
        <option value={"Digital"}>Digital</option>
        <option value={"In-Person"}>In-Person</option>
      </select>

      {meetupList &&
        searchResults.map(
          ({ eventImage, eventName, eventType, eventDateAndTime, _id }) => {
            return (
              <div key={_id}>
                <h3>{eventName}</h3>
                <img src={eventImage} alt={eventName} width="200" />
                <p>{eventType}</p>
                <p>{eventDateAndTime}</p>
                <button onClick={() => handleSave(_id)}>
                  {/* remove ?  */}
                  {!userInfo.eventsAttended?.includes(_id) ? (
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size="lg"
                      style={{ color: "#32612d" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBook}
                      size="lg"
                      style={{ color: "#32612d" }}
                    />
                  )}
                </button>
                <Link to={`/meetup/${_id}`}>
                  <button>See More Details</button>
                </Link>
              </div>
            );
          }
        )}
    </div>
  );
}

export default MeetupList;
