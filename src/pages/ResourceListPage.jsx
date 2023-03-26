import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../api/service";

function ResourceListPage() {
  const [resourceList, setResourceList] = useState([]);

  useEffect(() => {
    service
      .getAllResource()
      .then((data) => {
        setResourceList(data);
      })
      .catch((err) => console.log("Error retrieving resource list", err));
  }, []);

  return (
    <div className="ResourceListPage">
      <h2>Resource</h2>
      {resourceList &&
        resourceList.map((singleResource) => {
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

export default ResourceListPage;
