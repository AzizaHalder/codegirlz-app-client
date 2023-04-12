import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="navbar fixed-bottom">
      <Link to="/" className="navbar-brand">
        <footer id="copyright-footer">
          <small>© Copyright 2023 All Rights Reserved CodeGirlz </small>
        </footer>
      </Link>
    </div>
  );
};

export default Footer;
