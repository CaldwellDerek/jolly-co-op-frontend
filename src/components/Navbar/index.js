import React from 'react';
import {Link} from "react-router-dom"
import "./style.css"

const Navbar = (props) => {
    
  return (
    <div className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/findgame">Find Game</Link>
        <Link to="/login">Login</Link>  {/* make switch with logout page if logged in */}
       
        {props.isLoggedIn?<button onClick={props.logout}>Logout</button>:null}
    </div>
  )
}

export default Navbar