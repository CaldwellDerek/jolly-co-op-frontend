import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <h1>JOLLY-COOP</h1>
      <div className="footerul">
        <div>
          <h5>
            <strong>Support</strong>
          </h5>
          <ul>
            <li>Help</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Group</strong>
          </h5>
          <ul>
            <li>About</li>
            <li>Repo</li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Terms & Policies</strong>
          </h5>
          <ul>
            <li>Terms of User</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
