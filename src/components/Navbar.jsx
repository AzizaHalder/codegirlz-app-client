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
import { useState } from 'react';

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (

    <div id="nav-container" className="justify-content-center">

      {isLoggedIn && (
        <>
          <Navbar collapseOnSelect expand="sm" className="justify-content-center" >
            <Container fluid>
              <div id="nav-container-logged-in">
                <Navbar.Brand>
                  <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" id="logo-button"></img>
                  </Link>
                </Navbar.Brand>
                <Nav className="justify-content-center" navbarScroll fixed="top" id="nav-bar" >
                  <div id="nav-drop-down-menu">
                    <Navbar.Toggle aria-controls="navbarScroll" id="nav-toggle" />
                    <Navbar.Collapse id="navbarScroll" >
                      <ul>
                        <li>
                          <NavDropdown title={<FontAwesomeIcon icon={faUsers} style={{ color: "#81B4A6", }} />} id="navbarScrollingDropdown" className="dropdown-menu-end" >
                            <NavDropdown.Item><Link to="/meetup">
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
                          </NavDropdown>
                        </li>
                        <li>
                          <NavDropdown title={<FontAwesomeIcon icon={faLaptopFile} style={{ color: "#81B4A6", }} />} id="collasible-nav-dropdown">
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

                        </li>

                        <li>
                          <Nav.Item>
                            <Link to="/auth/save">
                              <FontAwesomeIcon
                                icon={faBookmark}
                                style={{ color: "#81B4A6" }}
                              />
                            </Link>
                          </Nav.Item>
                        </li>
                        <li>
                          <Nav.Item onClick={logOutUser}>
                            Logout
                          </Nav.Item>
                        </li>
                      </ul>
                    </Navbar.Collapse>
                  </div>
                </Nav>
              </div>
            </Container>
          </Navbar>
        </>

      )
      }

      {!isLoggedIn && (

        <><Navbar collapseOnSelect expand="sm" className="justify-content-center" >
          <Container fluid>
            <div id="nav-container-logged-in">
              <Navbar.Brand>
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt="logo" id="logo-button"></img>
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-center" navbarScroll fixed="top" id="nav-bar" >
                <div id="nav-drop-down-menu">
                  <Navbar.Toggle aria-controls="navbarScroll" id="nav-toggle" />
                  <Navbar.Collapse id="navbarScroll" >
                    <ul>
                      <li>
                        <Nav.Item>
                          <Link to="/meetup">
                            Meetups {" "}<FontAwesomeIcon icon={faUsers} style={{ color: "#81B4A6", }} />
                          </Link>
                        </Nav.Item>
                      </li>
                      <li>
                        <Nav.Item>
                          <Link to="/resource">
                            Resources {" "}<FontAwesomeIcon icon={faLaptopFile} style={{ color: "#81B4A6", }} />
                          </Link>
                        </Nav.Item>
                      </li>
                      <li>
                        <Nav.Item>
                          <Link to="/auth/login">
                            Login{" "}<FontAwesomeIcon icon={faRightToBracket} style={{ color: "#81B4A6", }} />
                          </Link>
                        </Nav.Item>
                      </li>
                    </ul>
                  </Navbar.Collapse>
                </div>
              </Nav>
            </div>
          </Container>
        </Navbar>

        </>
      )
      }

    </div>
  );
}

export default NavBar;
