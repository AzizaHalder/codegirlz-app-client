import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import logo from '../images/logo.png'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">

      <Container>
        <Nav className="justify-content-center" fixed="top" id="nav-bar">
          <Navbar.Brand>
            <Link to="/">
              <Button justify variant="link"><img src={logo} alt="logo" id="logo-button"></img></Button>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Item>
              <span>Welcome {user && user.name} 👋 </span>
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

                <Nav.Item>
                  <Link to="/meetup/create">
                    <Button justify variant="light">Create Meetup</Button>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/resource/create">
                    <Button justify variant="light">Add Resource</Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/auth/save">
                    <Button justify variant="light">
                      My Saved Items <FontAwesomeIcon
                        icon={faBookmark}
                        size="lg"
                        style={{ color: "#32612d" }}
                      />
                    </Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Button justify variant="light" onClick={logOutUser}>Logout</Button>
                </Nav.Item>

              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Item>
                  <Link to="/auth/login">
                    <Button variant="light">Login</Button>
                  </Link>
                </Nav.Item>
              </>
            )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;
