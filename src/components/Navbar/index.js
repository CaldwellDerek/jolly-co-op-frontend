import React from 'react';
import {Link} from "react-router-dom"
import "./style.css"

const Navbar = (props) => {
    
  return (
    <div className="Navbar">
        <Link to="/findgames">Find Game</Link>
      
       {props.isLoggedIn? 
       <>
       <Link to={`/home/${props.userId}`}>Home</Link>
       <Link to='/mylist'>My List</Link>
       <Link to='/mygroup'>My Group</Link>
       </>
        : <Link to ="/login">Login</Link>}
        {props.isLoggedIn?<button onClick={props.logout}>Logout</button>:null}
    </div>
  )
}

export default Navbar