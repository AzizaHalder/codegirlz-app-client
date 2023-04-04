import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { faLaptopFile } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar
      // bg="light"
      expand="sm"
      className="justify-content-center"
      id="external-navbar"
    >
      {isLoggedIn && (
        <>
          <Container id="nav-container-logged-in">
            <Nav
              className="justify-content-end"
              style={{ width: "100%" }}
              navbarScroll
              fixed="top"
              id="nav-bar"
            >
              <Navbar.Brand href="#home">
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" id="logo-button"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-toggle" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav
                  className="justify-content-end"
                  style={{ width: "100%" }}
                  id="nav-drop-down-menu"
                >
                  <ButtonGroup className="mb-2">
                    <ul>
                      <li>
                        <NavDropdown
                          align="right"
                          title={
                            <FontAwesomeIcon
                              icon={faUsers}
                              size="2x"
                              style={{ color: "#81B4A6" }}
                            />
                          }
                          id="navbarScrollingDropdown"
                          className="dropdown-menu-end"
                        >
                          <NavDropdown.Item>
                            <Link to="/meetup">Browse Meetups</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to="/meetup/create">Create Meetup</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to="/auth/attend">Attend Meetup</Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      <li>
                        <NavDropdown
                          title={
                            <FontAwesomeIcon
                              icon={faLaptopFile}
                              size="2x"
                              style={{ color: "#81B4A6" }}
                            />
                          }
                          id="collasible-nav-dropdown"
                        >
                          <NavDropdown.Item>
                            <Link to="/resource">Browse Resources</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to="/resource/create">Add Resource</Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </li>
                      <li>
                        <Nav.Item>
                          <Link to="/auth/save">
                            <FontAwesomeIcon
                              icon={faBookmark}
                              size="2x"
                              style={{ color: "#81B4A6" }}
                            />
                          </Link>
                        </Nav.Item>
                      </li>
                      <li id="log-out-button-list">
                        <Button variant="outline-light" id="login-button">
                          <Nav.Item
                            onClick={logOutUser}
                            // style={{ color: "#81B4A6" }}
                          >
                            Logout
                          </Nav.Item>
                        </Button>
                      </li>
                    </ul>
                  </ButtonGroup>
                </Nav>
              </Navbar.Collapse>
            </Nav>
          </Container>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Container id="nav-container-logged-out">
            <Nav
              className="justify-content-end"
              style={{ width: "100%" }}
              navbarScroll
              fixed="top"
              id="nav-bar"
            >
              <Navbar.Brand href="#home">
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" id="logo-button"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-toggle" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav
                  className="justify-content-end"
                  style={{ width: "100%" }}
                  id="nav-drop-down-menu"
                >
                  <ButtonGroup className="mb-2">
                    <ul>
                      <li>
                        <Button
                          style={{ backgroundColor: "#1A6A68", border: "none" }}
                        >
                          <Nav.Item>
                            <Link to="/meetup">Meetup</Link>
                          </Nav.Item>
                        </Button>
                      </li>
                      <li>
                        <Button
                          style={{ backgroundColor: "#1A6A68", border: "none" }}
                        >
                          <Nav.Item>
                            <Link to="/resource">Learn</Link>
                          </Nav.Item>
                        </Button>
                      </li>
                      <li>
                        <Button
                          style={{ backgroundColor: "#1A6A68", border: "none" }}
                        >
                          <Nav.Item>
                            <Link to="/auth/login">Login</Link>
                          </Nav.Item>
                        </Button>
                      </li>
                    </ul>
                  </ButtonGroup>
                </Nav>
              </Navbar.Collapse>
            </Nav>
          </Container>
        </>
      )}
    </Navbar>
  );
}

export default NavBar;
