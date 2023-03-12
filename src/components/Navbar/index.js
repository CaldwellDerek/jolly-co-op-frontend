import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <h1 className="titlename">JOLLY-COOP</h1>
      <div className="NavbarBtnContainer">
        <Link className="NavbarBtn" to="/findgames">
          Find Game
        </Link>

        {props.isLoggedIn ? (
          <>
            <Link className="NavbarBtn" to={`/home/${props.userId}`}>
              Home
            </Link>
            <Link className="NavbarBtn" to="/mylist">
              My List
            </Link>
            <Link className="NavbarBtn" to="/mygroup">
              My Group
            </Link>
          </>
        ) : (
          <Link className="NavbarBtn" to="/login">
            Login
          </Link>
        )}
        {props.isLoggedIn ? (
          <button className="NavbarBtn" onClick={props.logout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
