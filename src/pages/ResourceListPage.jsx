import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../api/service";
import SearchBar from "../components/SearchBar";

function ResourceList() {
  // initial render
  const [resourceList, setResourceList] = useState([]);
  // holds result of filtered search
  const [searchResults, setSearchResults] = useState([]);

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
                <p>{author?.name}</p>
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
