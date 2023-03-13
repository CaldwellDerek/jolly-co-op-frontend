import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <div className="titlecontainer">
      <h1 className="titlename godown">J </h1>
      <h1 className="titlename">0</h1>
      <h1 className="titlename">L</h1>
      <h1 className="titlename">L</h1>
      <h1 className="titlename">Y</h1>
      <h1 className="titlename">--</h1>
      <h1 className="titlename">C</h1>
      <h1 className="titlename">0</h1>
      <h1 className="titlename">0</h1>
      <h1 className="titlename">P</h1>
      </div>
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
