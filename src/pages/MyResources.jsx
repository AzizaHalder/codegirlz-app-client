import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MyResources() {
  const { user } = useContext(AuthContext);
  //   const { resourceId } = useParams();
  const [savedResource, setSavedResource] = useState(null);

  const API_URL = `http://localhost:5005`;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/auth/save`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setSavedResource(res.data))
      .catch((err) =>
        console.log("Error while retrieving saved resources details:", err)
      );
  }, []);

  console.log(`This is the saved resource:`, savedResource);
  // console.log(`This is the saved resource:`, savedResource[0].myResource[0].resourceTitle)

  /** @todo
   * Add Dynamic Link Route to each resource
   * <Link to={`${API_URL}/resource/${resourceId}`}></Link>
   *
   */
  return (
    <div>
      <h1>SavedResources</h1>

      {savedResource &&
        savedResource.map(({ myResource, _id }) => {
          return (
            <div key={_id}>
              {myResource.map((value) => (
                <>
                  <img src={value.resourceImage} alt={value.resourceTitle} />
                  <h3> {value.resourceTitle}</h3>
                </>
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default MyResources;
