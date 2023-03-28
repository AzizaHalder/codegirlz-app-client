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
        console.log("DATA:", data);
        setResourceList(data);
        setSearchResults(data);
      })
      .catch((err) =>
        console.error("Error while retrieving resource list:", err)
      );
  }, []);

  const handleQuery = (searchTerm) => {
    const resourceToSearch = [...resourceList];
    console.log("Research To Search", resourceToSearch);
    const searchQuery = resourceToSearch.filter((resource) =>
      resource.resourceTitle
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
        searchResults.map((singleResource) => {
          return (
            <div key={singleResource._id}>
              <h3>{singleResource.resourceTitle}</h3>
              <img
                src={singleResource.resourceImage}
                alt={singleResource.resourceTitle}
              />
              <p>{singleResource.resourceType}</p>
              <p>{singleResource.author}</p>
              <Link to={`/resource/${singleResource._id}`}>
                <button>Read More</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ResourceList;
