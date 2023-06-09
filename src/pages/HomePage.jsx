import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";

function HomePage() {
  return (
    <div id="title-card">
      <Card id="title-card">
        <Card.Img
          id="title-card-image"
          src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680857251/code-girlz/profile_tlpyz2.jpg"
          alt="Card image"
        />
        <Card.ImgOverlay id="card-image-overlay">
          <div style={{ width: "50%" }}>
            <Card.Title id="card-title-codegirlz">CodeGirlz</Card.Title>
            <Card.Text id="card-text-codegirlz">
              connecting female identifying coders <br></br>
              in person and online
            </Card.Text>
          </div>
        </Card.ImgOverlay>
      </Card>
      <div id="image-container">
        <Card style={{ width: "40%" }} id="card-container">
          <Link to={"/meetup"} className="home-info">
            <Card.Body>
              <Card.Title>Meetups</Card.Title>
              <Card.Text>meet with coderz in your area or online</Card.Text>
            </Card.Body>
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680808126/code-girlz/meetup3_zlitwj.jpg"
              id="header-card-image"
            />
          </Link>
        </Card>
        <Card style={{ width: "40%" }} id="card-container">
          <Link to={"/resource"} className="home-info">
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680810179/code-girlz/resources_vmpwhx.jpg"
              id="header-card-image"
            />
            <Card.Body>
              <Card.Title>Learn</Card.Title>
              <Card.Text>
                read, listen or watch to learn more about web development
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </div>
      <div id="home-gallery">
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail1_es8cfm.jpg"
              style={{
                width: "100%",
                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail3_cujvct.jpg"
              style={{
                width: "100%",
                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail2_fhkgyt.jpg"
              style={{
                width: "100%",
                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680808122/code-girlz/meetup2_g7vfyo.jpg"
              style={{
                width: "100%",
                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850361/code-girlz/meetupthumbnail9_bvcsfu.jpg"
              style={{
                width: "100%",

                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850362/code-girlz/meetupthumbnail8_fnkjqx.jpg"
              style={{
                width: "100%",

                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850362/code-girlz/meetupthumbnail5_lifpil.jpg"
              style={{
                width: "100%",

                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
        <Card style={{ width: "20rem" }} id="card">
          <Link to="/resource" className="navbar-brand">
            <Card.Img
              id="card-image"
              variant="top"
              src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850365/code-girlz/meetupthumbnail6_m5kecv.jpg"
              style={{
                width: "100%",

                maxWidth: "20rem",
              }}
            />
          </Link>
        </Card>
      </div>

      <div id="footer-more-info">
        <div>
          <ul className="footer-list">
            <li className="footer-info">
              Aziza Halder
              <Link
                className="footer-link"
                target="_blank"
                to="https://github.com/AzizaHalder"
              >
                <img
                  title="github"
                  alt="github logo"
                  id="github-logo"
                  src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680853437/code-girlz/github-mark_pus5z3.png"
                />
              </Link>
            </li>
            <li className="footer-info">
              Nicole Bell
              <Link
                className="footer-link"
                target="_blank"
                to="https://github.com/ozzleme"
              >
                <img
                  title="github"
                  alt="github logo"
                  id="github-logo"
                  src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680853437/code-girlz/github-mark_pus5z3.png"
                />
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer-list">
          <li className="footer-info">
            <Link className="footer-link" to="/auth/signup">
              CodeGirlz Sign Up
            </Link>
          </li>
          <li className="footer-info">
            <Link className="footer-link" to="/meetup">
              Meetup
            </Link>
          </li>
          <li className="footer-info">
            <Link className="footer-link" to="/resource">
              Learn
            </Link>
          </li>

          <li className="footer-info">
            <Link className="footer-link" to="/auth/recruiter/signup">
              Recruiterz Sign Up
            </Link>
          </li>
        </ul>
      </div>
      {/*     <FontAwesomeIcon
                    icon={faEnvelope}
                    size="2xl"
                    style={{ color: "#1A6A68" }}
                    id="email-image"
                  /> */}
    </div>
  );
}

export default HomePage;
