// src/api/service.js

import axios from "axios";
import { useParams } from "react-router-dom";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  //   used to be : baseURL: "http://localhost:5005/api", but changed it since we don't have /api in our route
  baseURL: "http://localhost:5005",
  withCredentials: true, // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getAllMeetup = () => {
  const storedToken = localStorage.getItem("authToken");

  return api

    .get("/meetup", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadEventImage = (file) => {
  const storedToken = localStorage.getItem("authToken");
  return api
    .post("/meetup/upload", file, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const createMeetup = (newMeetup) => {
  const storedToken = localStorage.getItem("authToken");

  return api
    .post("/meetup/create", newMeetup, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

// How do we make the routes dynamic (`${API_URL}/meetup/edit/${meetupId}`)
// Played around with useParams, only got major errors...
// Atm when I try to delete something, in the server side console this it the URL / error
//  --> DELETE /meetup/edit/:meetupId 400, no dynamic route :'(
const updateMeetup = (updatedMeetup) => {
  const storedToken = localStorage.getItem("authToken");

  return api
    .put("/meetup/edit/:meetupId", updatedMeetup, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};
const deleteMeetup = (deleteMeetup) => {
  const storedToken = localStorage.getItem("authToken");

  return api
    .delete("/meetup/edit/:meetupId", deleteMeetup, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const meetupService = {
  getAllMeetup,
  uploadEventImage,
  createMeetup,
  deleteMeetup,
  updateMeetup,
};

export default meetupService;
