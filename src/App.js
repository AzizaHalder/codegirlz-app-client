import "./App.css";
import { Routes, Route } from "react-router-dom";
import MeetupList from "./pages/MeetupListPage";
import AddMeetup from "./components/AddMeetup";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MeetupDetails from "./pages/MeetupDetailsPage";
import EditMeetUp from "./pages/EditMeetupPage";
import ResourceList from "./pages/ResourceListPage";
import AddResource from "./components/AddResource";
import ResourceDetails from "./pages/ResourceDetailsPage";
import EditResource from "./pages/EditResourcePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/meetup" element={<MeetupList />} />
        <Route path="/meetup/create" element={<AddMeetup />} />
        <Route path="/meetup/:meetupId" element={<MeetupDetails />} />
        <Route path="/meetup/edit/:meetupId" element={<EditMeetUp />} />

        <Route path="/resource" element={<ResourceList />} />

        <Route path="/resource/create" element={<AddResource />} />
        <Route path="/resource/:resourceId" element={<ResourceDetails />} />
        <Route path="/resource/edit/:resourceId" element={<EditResource />} />
      </Routes>
    </div>
  );
}

export default App;
