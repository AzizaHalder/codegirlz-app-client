import React, { useState, useEffect } from "react";
import service from "../api/service";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function MeetupList() {
  const [meetupList, setMeetupList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    service
      .getAllMeetup()
      .then((data) => {
        setMeetupList(data);
        setSearchResults(data);
      })
      .catch((err) =>
        console.log("Error while retrieving resource list:", err)
      );
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
