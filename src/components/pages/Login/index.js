import React, { useState } from "react";
import "./style.css";
import API from "../../../utils/API"
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [signupUsername, setsignupUsername] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
      case "loginEmail":
        setloginEmail(value);
        break;
      case "loginPassword":
        setloginPassword(value);
        break;
        case "signupUsername":
            setsignupUsername(value);
            break;
      case "signupEmail":
        setsignupEmail(value);
        break;
      case "signupPassword":
        setsignupPassword(value);
        break;

      default:
        break;
    }
  };
  const handleFormSubmit = e =>{
    e.preventDefault();
    const userObj = {
        email: loginEmail,
        password: loginPassword
    }
    API.login(userObj).then(data=>{
        console.log(data)
if(data.token){
    props.setToken(data.token)
    props.setIsLoggedIn(true);
    props.setUserId(data.user.id)
    props.setUserName(data.user.username)
}
localStorage.setItem("token", data.token)

        setloginEmail("")
        setloginPassword("")
        let path = `/home/${data.user.id}`;
        navigate(path);
    })
    
  }
  const handleSignupSubmit = e =>{
    e.preventDefault();
    const userObj = {
        email: signupEmail,
        password: signupPassword, 
        username: signupUsername
    }
    API.signup(userObj).then(data=>{
        console.log(data)
        if(data.token){
            props.setToken(data.token);
            props.setIsLoggedIn(true);
            props.setUserId(data.user.id)
        }

        localStorage.setItem("token", data.token)
        setsignupUsername("")
        setsignupEmail("")
        setsignupPassword("")
        
        let path = `/home/${data.user.id}`;
        navigate(path);
    })
}

// const routeChange= () =>{
//     let path = "/";
//     navigate(path);
//   }

  return (
    <div className="loginBody">
      <div>
        <h1>Login Here! </h1>
        <div  className="Login">

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="loginEmail">Email:</label>
        
          <input
            type="text"
            name="loginEmail"
            value={loginEmail}
            onChange={handleFormChange}
            />{" "}
        
          <label htmlFor="loginPassword">Password:</label>
        
          <input
            type="password"
            name="loginPassword"
            value={loginPassword}
            onChange={handleFormChange}
            />
          <button>Login</button>
        </form>


        <form onSubmit={handleSignupSubmit}>
        <label htmlFor="signupUsername">Username:</label>
          
          <input
            type="text"
            name="signupUsername"
            value={signupUsername}
            onChange={handleFormChange}/>{" "}

          <label htmlFor="signupEmail">Email:</label>
          
          <input
            type="text"
            name="signupEmail"
            value={signupEmail}
            onChange={handleFormChange}
            />{" "}
        
          <label htmlFor="signupPassword">Password:</label>
        
          <input
            type="password"
            name="signupPassword"
            value={signupPassword}
            onChange={handleFormChange}
            />
          <button >Signup</button>
        </form>
            </div>
      </div>
    </div>
  );
};

