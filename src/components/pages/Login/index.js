import React, { useState } from "react";
import "./style.css";
import API from "../../"

export const Login = () => {
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");

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
        setloginEmail("")
        setloginPassword("")
    })
  }

  return (
    <div>
      <div>
        <h1>Login Here! </h1>
        <div  className="Login">

        <form 
        // onSubmit={handleFormSubmit}
        >
          <label for="loginEmail">Email:</label>
        
          <input
            type="text"
            name="loginEmail"
            value={loginEmail}
            onChange={handleFormChange}
            />{" "}
        
          <label for="loginPassword">Password:</label>
        
          <input
            type="password"
            name="loginPassword"
            value={loginPassword}
            onChange={handleFormChange}
            />
          <button>Login</button>
        </form>
        <form 
        // onSubmit={handleFormSubmit}
        >
          <label for="signupEmail">Email:</label>
          
          <input
            type="text"
            name="signupEmail"
            value={signupEmail}
            onChange={handleFormChange}
            />{" "}
        
          <label for="signupPassword">Password:</label>
        
          <input
            type="password"
            name="signupPassword"
            value={signupPassword}
            onChange={handleFormChange}
            />
          <button>Signup</button>
        </form>
            </div>
      </div>
    </div>
  );
};
