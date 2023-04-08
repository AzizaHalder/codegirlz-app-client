import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import service from "../api/service";

function ResourceList() {
  // initial render
  const [resourceList, setResourceList] = useState([]);
  // holds result of filtered search
  const [searchResults, setSearchResults] = useState([]);

  const [userInfo, setUserInfo] = useState(false);

  const { user } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    service
      .getAllResource()
      .then((data) => {
        setResourceList(data);
        setSearchResults(data);
        console.log("DATA", data);
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
        `${API_URL}/auth/${resourceId}/save`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
        // console.log(`${API_URL}/auth/${resourceId}/save`)
      )
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  };
  // console.log(userInfo);
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

      {resourceList &&
        searchResults.map(
          ({
            _id,
            resourceTitle,
            resourceImage,
            resourceType,
            author,
            podcastUpload,
            videoUpload,
          }) => {
            return (
              <div key={_id}>
                <h3>{resourceTitle}</h3>

                <p>{resourceType}</p>
                {resourceType === "Article" && (
                  <img src={resourceImage} alt={resourceTitle} />
                )}

                {resourceType === "Podcast" && (
                  <iframe
                    className="PodcastThumbnail"
                    loading="lazy"
                    width="50%"
                    src={`https://open.spotify.com/embed/episode${podcastUpload}?utm_source=generator`}
                    title="Spotify podcast"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}

                {resourceType === "Video" && (
                  <iframe
                    width="50%"
                    src={`https://www.youtube.com/embed/${videoUpload}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}
                {/* remove question mark once code finalised */}
                <p>{author?.name}</p>
                <button onClick={() => handleSave(_id)}>
                  {!userInfo.myResource?.includes(_id) ? (
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

                <Link to={`/resource/${_id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            );
          }
        )}
    </div>
  );
}

export default ResourceList;
