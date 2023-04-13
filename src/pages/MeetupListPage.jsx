import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import service from "../api/service";

function MeetupList() {
  const [meetupList, setMeetupList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // Attend a meetup
  const [userInfo, setUserInfo] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);
  console.log(user);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    service
      .getAllMeetup()
      .then((result) => {
        setMeetupList(result);
        setSearchResults(result);
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
        `${API_URL}/meetup/${meetupId}/attend`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
        // console.log(`${API_URL}/auth/${meetupId}/attend`)
      )
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log("Error while trying to attend meetup", err));
    // setSaved(true);
  };

  return (
    <Container className="MeetupListPage">
      <h1 className="page-title">Meetup</h1>

      <SearchBar onQuery={handleQuery} />

      <select
        className="form-select"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value={"All"}>All</option>
        <option value={"Digital"}>Digital</option>
        <option value={"In-Person"}>In-Person</option>
      </select>

      <div className="all-cards">
        {meetupList &&
          searchResults.map(
            ({ eventImage, eventName, eventType, eventDateAndTime, _id }) => {
              return (
                <Card
                  key={_id}
                  className="border-0 card-list bg-light"
                  style={{ width: "250px" }}
                >
                  <div className="card-content">
                    <Link to={`/meetup/${_id}`} className="more-details">
                      <Card.Title>{eventName}</Card.Title>
                      <img
                        src={eventImage}
                        alt={eventName}
                        className="card-img"
                      />
                      <div className="event-details">
                        <p>{eventType}</p>
                        <p>{eventDateAndTime}</p>
                      </div>
                    </Link>
                    {isLoggedIn && user.name && (
                      <div>
                        <Button
                          className="bg-transparent border-0"
                          title="Attend / Unattend Meetup"
                          onClick={() => handleSave(_id)}
                        >
                          {/* remove --> ?  */}
                          {!userInfo.eventsAttended?.includes(_id) ? (
                            <FontAwesomeIcon
                              icon={faCalendarPlus}
                              size="lg"
                              style={{ color: "#81b4a6" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCalendar}
                              size="lg"
                              style={{ color: "#1a6a68" }}
                            />
                          )}
                        </Button>
                        <p className="hosted-by">Hosted by: {user.name}</p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            }
          )}
      </div>
    </Container>
  );
}

export default MeetupList;
