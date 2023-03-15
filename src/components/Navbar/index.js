import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import cloud from "./cloud.png"

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <div className="titlecontainer">
      <h1 className="titlename">J </h1>
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
        <Link to="/findgames"><button className="button-74"> Find Game</button>
        </Link>

        {props.isLoggedIn ? (
          <>
            <Link  to={`/home/${props.userId}`}><button className="button-74">  Home</button>
            
            </Link>
            <Link  to="/mylist"><button className="button-74">My List</button>
            </Link>
            <Link  to="/mygroup"><button className="button-74">My Group</button>
            </Link>
          </>
        ) : (
          <Link  to="/login"><button className="button-74">Login</button>
    
          </Link>
        )}
        {props.isLoggedIn ? (
          <button className="button-74" onClick={props.logout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
