// src/api/service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  //   used to be : baseURL: "http://localhost:5005/api", but changed it since we don't have /api in our route
  baseURL: "http://localhost:5005",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getAllMeetup = () => {
  return api
    .get("/meetup")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadEventImage = (file) => {
  return api
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const createMeetup = (newMeetup) => {
  return api
    .post("/meetup", newMeetup)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  getAllMeetup,
  uploadEventImage,
  createMeetup,
};
