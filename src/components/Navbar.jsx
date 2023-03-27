import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          {/* Do we want to show meet up list and resource list when use is not logged in? */}
          <Link to="/meetup">
            <button>Meetups</button>
          </Link>

          <Link to="/meetup/create">
            <button>Create Meetup</button>
          </Link>

          <Link to="/resource">
            <button>Resources</button>
          </Link>

          <Link to="/resource/create">
            <button>AddResource</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>Welcome {user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/auth/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
