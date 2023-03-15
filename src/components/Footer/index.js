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
            <strong>Claire Eberle
</strong>
          </h5>
          <ul>
            <li><a href="https://github.com/ClaireEberle">Gihub</a></li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Connor McLaughlin
 </strong>
          </h5>
          <ul>
            <li><a href="https://github.com/ConnorMcLaughlin2022">Gihub</a></li>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Derek Caldwell</strong>
          </h5>
          <ul>
            <l><a href="https://github.com/CaldwellDerek" target="_blank">Github</a></l>
          </ul>
        </div>
        <div>
          <h5>
            <strong>Yanqing Lou</strong>
          </h5>
          <ul>
            <li><a href="https://github.com/yanqinglou">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
