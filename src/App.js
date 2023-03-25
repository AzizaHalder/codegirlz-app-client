import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import MeetupList from "./pages/MeetupListPage";
import AddMeetup from "./components/AddMeetup";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/meetup"> Meetup</Link>
        <Link to="/meetup/create"> Create a Meetup</Link>
      </nav>

      <Routes>
        <Route path="/meetup" element={<MeetupList />} />
        <Route path="/meetup/create" element={<AddMeetup />} />
      </Routes>
    </div>
  );
}

export default App;
