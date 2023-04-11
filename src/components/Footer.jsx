import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer id="copyright-footer">
      <small>© Copyright 2023 All Rights Reserved</small>
      <Link to="/" className="navbar-brand">
        <img
          title="back to homepage"
          src={logo}
          alt="logo"
          id="logo-button"
          style={{ width: "50%", padding: " 5px" }}
        ></img>
      </Link>
    </footer>
  );
};

export default Footer;
