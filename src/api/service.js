// src/api/service.js

import axios from "axios";

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

const updateMeetup = (updatedMeetup) => {
  const storedToken = localStorage.getItem("authToken");

  return api
    .put("/meetup/edit/:meetupId", updatedMeetup, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const meetupService = {
  getAllMeetup,
  uploadEventImage,
  createMeetup,
  updateMeetup
};

export default meetupService;
