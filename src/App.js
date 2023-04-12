import "./styles/App.css";
import "./styles/cards.css";
import { Routes, Route } from "react-router-dom";
import MeetupList from "./pages/MeetupListPage";
import AddMeetup from "./components/AddMeetup";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MeetupDetails from "./pages/MeetupDetailsPage";
import EditMeetUp from "./pages/EditMeetupPage";
import ResourceList from "./pages/ResourceListPage";
import AddResource from "./components/AddResource";
import ResourceDetails from "./pages/ResourceDetailsPage";
import EditResource from "./pages/EditResourcePage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import MyResources from "./pages/MyResources";
import AttendMeetup from "./pages/SavedMeetup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";
import SignUpPageRecruiter from "./pages/SignUpPageRecruiter";
import "./styles/Forms.css";
import "./styles/editPages.css";
import LoginPageRecruiter from "./pages/LoginPageRecruiter";
import JobCandidates from "./pages/JobCandidates";

// src / styles / index.css;

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/auth/recruiter/login"
          element={
            <IsAnon>
              <LoginPageRecruiter />
            </IsAnon>
          }
        />
        <Route
          path="/auth/recruiter/signup"
          element={<SignUpPageRecruiter />}
        />
        <Route path="/meetup" element={<MeetupList />} />
        <Route
          path="/meetup/create"
          element={
            <IsPrivate>
              <AddMeetup />
            </IsPrivate>
          }
        />
        <Route
          path="/meetup/:meetupId"
          element={
            <IsPrivate>
              <MeetupDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/meetup/edit/:meetupId"
          element={
            <IsPrivate>
              <EditMeetUp />
            </IsPrivate>
          }
        />
        <Route path="/resource" element={<ResourceList />} />
        <Route
          path="/resource/create"
          element={
            <IsPrivate>
              <AddResource />
            </IsPrivate>
          }
        />
        <Route path="/resource/:resourceId" element={<ResourceDetails />} />
        <Route
          path="/resource/edit/:resourceId"
          element={
            <IsPrivate>
              <EditResource />
            </IsPrivate>
          }
        />
        <Route path="/resource/save" element={<MyResources />} />
        <Route path="/meetup/attend" element={<AttendMeetup />} />

        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="profile/:profileId/edit/" element={<EditProfile />} />
        <Route path="/recruiter/job-candidates" element={<JobCandidates />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
