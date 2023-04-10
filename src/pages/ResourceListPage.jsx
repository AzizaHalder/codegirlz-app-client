import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import service from "../api/service";

function ResourceList() {
  // initial render
  const [resourceList, setResourceList] = useState([]);
  // holds result of filtered search
  const [searchResults, setSearchResults] = useState([]);

  const [userInfo, setUserInfo] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    service
      .getAllResource()
      .then((data) => {
        setResourceList(data);
        setSearchResults(data);
        return service.getUserInfo();
      })
      .then((user) => setUserInfo(user))
      .catch((err) =>
        console.error("Error while retrieving resource list:", err)
      );
  }, []);

  /**@todo update variable names*/

  const handleQuery = (searchTerm) => {
    const resourceToSearch = [...resourceList];
    // console.log("Resource To Search", resourceToSearch);
    const searchQuery = resourceToSearch.filter(
      (resource) =>
        resource.resourceTitle
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()) ||
        resource.resourceType
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
    );
    setSearchResults(searchQuery);
    console.log(searchTerm);
  };

  const handleFilter = (type) => {
    if (type === "All") {
      setSearchResults(resourceList);
    } else {
      const filtered = resourceList.filter(
        (resource) => resource.resourceType === type
      );
      setSearchResults(filtered);
    }
  };

  const handleSave = (resourceId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/resource/${resourceId}/save`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ResourceListPage">
      <h2>Resource</h2>
      <SearchBar onQuery={handleQuery} />

      <select name="Filter" onChange={(e) => handleFilter(e.target.value)}>
        <option value={"All"}>All</option>
        <option value={"Article"}>Article</option>
        <option value={"Video"}>Video</option>
        <option value={"Podcast"}>Podcast</option>
      </select>

      <div className="all-cards">
        {resourceList &&
          searchResults.map(
            ({
              _id,
              resourceTitle,
              resourceImage,
              resourceType,
              podcastUpload,
              videoUpload,
            }) => {
              return (
                <Card
                  key={_id}
                  className="border-0 card-list bg-light"
                  style={{ width: "250px" }}
                >
                  <div className="card-content">
                    <Link to={`/resource/${_id}`} className="more-details">
                      {resourceType === "Article" && (
                        <img
                          className="list-img"
                          src={resourceImage}
                          alt={resourceTitle}
                        />
                      )}

                      {resourceType === "Podcast" && (
                        <iframe
                          className="podcast-thumbnail"
                          loading="lazy"
                          src={`https://open.spotify.com/embed/episode${podcastUpload}?utm_source=generator`}
                          title="Spotify podcast"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        ></iframe>
                      )}

                      {resourceType === "Video" && (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoUpload}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        ></iframe>
                      )}

                      <Card.Title>{resourceTitle}</Card.Title>
                    </Link>
                    <div className="resource-card-btn">
                      <p>{resourceType}</p>
                      {isLoggedIn && (
                        <Button
                          className="bg-transparent border-0"
                          title="save / unsave resource"
                          onClick={() => handleSave(_id)}
                        >
                          {/* remove question mark once code finalised */}
                          {!userInfo.myResource?.includes(_id) ? (
                            <FontAwesomeIcon
                              icon={faFileCirclePlus}
                              size="lg"
                              style={{ color: "#81b4a6" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size="lg"
                              style={{ color: "#1a6a68" }}
                            />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* <button>Read More</button> */}
                </Card>
              );
            }
          )}
      </div>
    </div>
  );
}

export default ResourceList;
