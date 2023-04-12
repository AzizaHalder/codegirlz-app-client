import axios from "axios";
import { useState, useEffect } from "react";

const JobCandidates = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  const [jobCandidates, setJobCandidates] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/recruiter/job-candidates`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setJobCandidates(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(jobCandidates);
  return (
    <>
      <h1 className="page-title">JobCandidates</h1>
      <div>
        {jobCandidates &&
          jobCandidates.map(({ name, level, linkedin }) => {
            return (
              <>
                <p>Name: {name}</p>
                <p>Level: {level}</p>
                <p>LinkedIn: {linkedin}</p>
              </>
            );
          })}
      </div>
    </>
  );
};

export default JobCandidates;
