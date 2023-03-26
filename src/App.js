import "./App.css";
import { Routes, Route } from "react-router-dom";
import MeetupList from "./pages/MeetupListPage";
import AddMeetup from "./components/AddMeetup";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MeetupCard from "./pages/MeetupDetailsPage";
import EditMeetUpPage from "./pages/EditMeetupPage";
import ResourceListPage from "./pages/ResourceListPage";
import AddResource from "./components/AddResource";

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
        <Route path="/meetup/:meetupId" element={<MeetupCard />} />
        <Route path="/meetup/edit/:meetupId" element={<EditMeetUpPage />} />
        <Route path="/resource" element={<ResourceListPage />} />
        <Route path="/resource/create" element={<AddResource />} />
      </Routes>
    </div>
  );
}

export default App;
