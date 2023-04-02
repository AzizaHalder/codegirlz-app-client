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
import { faLaptopFile } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (

    <Navbar collapseOnSelect bg="light" expand="sm" className="justify-content-center" id="external-navbar"  >

      {isLoggedIn && (
        <>
          <Container id="nav-container-logged-in">
            <Nav className="justify-content-center me-auto " navbarScroll fixed="top" id="nav-bar" >
              <Navbar.Brand className="border-left pl-2 ms-auto" >
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" id="logo-button"></img>
                </Link>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="navbarScroll" id="nav-toggle" />
              <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto" id="nav-drop-down-menu" >
                  <ButtonGroup className="mb-2">

                    <ul>
                      <li>
                        <Button variant="outline-secondary"><NavDropdown align="end" title={<FontAwesomeIcon icon={faUsers} style={{ color: "#81B4A6", }} />} id="navbarScrollingDropdown" className="dropdown-menu-end" >
                          <NavDropdown.Item ><Link to="/meetup">
                            Browse Meetups
                          </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item >
                            <Link to="/meetup/create">
                              Create Meetup
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item >
                            <Link to="/auth/attend">
                              Attend Meetup
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown></Button>
                      </li>
                      <li>
                        <Button variant="outline-secondary"><NavDropdown title={<FontAwesomeIcon icon={faLaptopFile} style={{ color: "#81B4A6", }} />} id="collasible-nav-dropdown">
                          <NavDropdown.Item><Link to="/resource">
                            Browse Resources
                          </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item >
                            <Link to="/resource/create">
                              Add Resource
                            </Link>
                          </NavDropdown.Item>
                        </NavDropdown>
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline-secondary"><Nav.Item>
                          <Link to="/auth/save">
                            <FontAwesomeIcon
                              icon={faBookmark}
                              style={{ color: "#81B4A6" }}
                            />
                          </Link>
                        </Nav.Item>
                        </Button>
                      </li>
                      <li>
                        <Button variant="outline-secondary"><Nav.Item onClick={logOutUser}>
                          Logout
                        </Nav.Item></Button>
                      </li>
                    </ul>
                  </ButtonGroup>
                </Nav>
              </Navbar.Collapse>
            </Nav>
          </Container>
        </>

      )
      }

      {!isLoggedIn && (
        <>

          <Container id="nav-container-logged-out">
            <Nav className="justify-content-center me-auto " navbarScroll fixed="top" id="nav-bar" >
              <Navbar.Brand className="border-left pl-2 ms-auto" >
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" id="logo-button"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" id="nav-toggle" />
              <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto" id="nav-drop-down-menu" >
                  <ButtonGroup className="mb-2">
                    <ul>
                      <li>

                        <Button variant="secondary"><Nav.Item>
                          <Link to="/meetup">
                            Meetups
                          </Link>
                        </Nav.Item></Button>
                      </li>
                      <li>
                        <Button variant="secondary"><Nav.Item>
                          <Link to="/resource">
                            Resources
                          </Link>
                        </Nav.Item></Button>
                      </li>
                      <li>
                        <Button variant="secondary"><Nav.Item>
                          <Link to="/auth/login">
                            Login
                          </Link>
                        </Nav.Item></Button>
                      </li>
                    </ul>
                  </ButtonGroup>
                </Nav>
              </Navbar.Collapse>
            </Nav>
          </Container>
        </>
      )
      }

    </Navbar >
  );
}

export default NavBar;
