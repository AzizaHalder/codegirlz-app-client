import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import logo from '../images/logo.png'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">

      <Container>
        <Nav className="justify-content-center" fixed="top" id="nav-bar">
          <Nav.Item>
            <Link to="/">
              <Button justify variant="link"><img src={logo} alt="logo" id="logo-button"></img></Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/meetup">
              <Button justify variant="light">Meetups</Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/resource">
              <Button justify variant="light">Resources</Button>
            </Link>
          </Nav.Item>


          {isLoggedIn && (
            <>
              {/* Do we want to show meet up list and resource list when use is not logged in? */}

              <Link to="/meetup/create">
                <button>Create Meetup</button>
              </Link>

              <Link to="/resource/create">
                <button>AddResource</button>
              </Link>

              {/* Icon is from Font Awesome, had to install a few packages and import them at the top of the page */}
              <Link to="/auth/save">
                <button>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    size="lg"
                    style={{ color: "#32612d" }}
                  />
                </button>
              </Link>

              <button onClick={logOutUser}>Logout</button>
              <span>Welcome {user && user.name}</span>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/auth/login">
                <Button variant="light">Login</Button>
              </Link>
            </>
          )}
        </Nav >
      </Container>
    </Navbar>
  );
}

export default NavBar;
