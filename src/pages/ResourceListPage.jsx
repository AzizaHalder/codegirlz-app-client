import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import service from "../api/service";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

function ResourceList() {
  // initial render
  const [resourceList, setResourceList] = useState([]);
  // holds result of filtered search
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useContext(AuthContext);

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    service
      .getAllResource()
      .then((data) => {
        setResourceList(data);
        setSearchResults(data);
      })
      .catch((err) =>
        console.error("Error while retrieving resource list:", err)
      );
  }, []);

  /**@todo update variable names*/

  const handleQuery = (searchTerm) => {
    const resourceToSearch = [...resourceList];
    console.log("Resource To Search", resourceToSearch);
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

  const handleSave = (resourceId) => {
    const storedToken = localStorage.getItem("authToken");

    axios.post(
      `${API_URL}/auth/${resourceId}/save`,
      { user },
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      },
      console.log(`${API_URL}/auth/${resourceId}/save`)
    );
  };

  return (
    <div className="ResourceListPage">
      <h2>Resource</h2>
      <SearchBar onQuery={handleQuery} />
      {resourceList &&
        searchResults.map(
          ({ _id, resourceTitle, resourceImage, resourceType, author }) => {
            return (
              <div key={_id}>
                <h3>{resourceTitle}</h3>
                <img src={resourceImage} alt={resourceTitle} />
                <p>{resourceType}</p>
                {/* remove question mark once code finalised */}
                <p>{author?.name}</p>
                <button onClick={() => handleSave(_id)}>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    size="lg"
                    style={{ color: "#32612d" }}
                  />
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
