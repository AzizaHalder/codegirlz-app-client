// src/api/service.js

import axios from "axios";
import { useParams } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5005",
  withCredentials: true,
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

const getAllResource = () => {
  const storedToken = localStorage.getItem("authToken");

  return api
    .get("/resource", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadResourceImage = (file) => {
  const storedToken = localStorage.getItem("authToken");
  return api
    .post("/resource/upload", file, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const createResource = (newResource) => {
  const storedToken = localStorage.getItem("authToken");
  return api
    .post("/resource/create", newResource, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

const meetupService = {
  getAllMeetup,
  uploadEventImage,
  createMeetup,
  getAllResource,
  uploadResourceImage,
  createResource,
  // deleteResource,
};

export default meetupService;
