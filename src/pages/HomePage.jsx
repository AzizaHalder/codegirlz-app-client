import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';


function HomePage() {

    return (
        <div>
            <div id="header">
                <div id="header-title">
                    <h1>CodeGirlz</h1>
                </div>
                <div id="header-text">
                    <h2>connecting female identifying coders</h2>
                    <h3>in person and online</h3>
                </div>
            </div>
            <div id="image-container">
                <img src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680808126/code-girlz/meetup3_zlitwj.jpg" alt="meetupImg2" id="image-home" />
                <div>
                    <h2>Meetups</h2>
                    <h3>meet with coderz in your area or online</h3>
                </div>
            </div>
            <div id="image-container">
                <div>
                    <h2>Resources</h2>
                    <h3>read, listen or watch to learn more about web development </h3>
                </div>
                <img src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680810179/code-girlz/resources_vmpwhx.jpg" alt="meetupImg2" id="image-home" />
            </div>
            <div id="home-gallery">
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail1_es8cfm.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail3_cujvct.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850360/code-girlz/meetupthumbnail2_fhkgyt.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680808122/code-girlz/meetup2_g7vfyo.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850361/code-girlz/meetupthumbnail9_bvcsfu.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850362/code-girlz/meetupthumbnail8_fnkjqx.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850362/code-girlz/meetupthumbnail5_lifpil.jpg" />
                    </Link>
                </Card>
                <Card style={{ width: '20rem' }} id="card">
                    <Link to="/resource" className="navbar-brand">
                        <Card.Img id="card-image" variant="top" src="https://res.cloudinary.com/ddieot9rc/image/upload/v1680850365/code-girlz/meetupthumbnail6_m5kecv.jpg" />
                    </Link>
                </Card>
            </div>
            <div id="footer">
                <Card id="footer-card">
                    <Card.Header>GirlCoderz</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Sign Up</ListGroup.Item>
                        <ListGroup.Item>Meetup</ListGroup.Item>
                        <ListGroup.Item>Learn</ListGroup.Item>
                    </ListGroup>
                </Card>
                <Card id="footer-card">
                    <Card.Header>Recruiters</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Register</ListGroup.Item>
                        <ListGroup.Item>Hire GirlCoderz</ListGroup.Item>
                        <ListGroup.Item>GirlCoderz Circles</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
    )
}

export default HomePage;