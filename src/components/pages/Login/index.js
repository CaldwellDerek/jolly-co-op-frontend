import React, { useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Login = (props) => {
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(true)
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

      default:
        break;
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      email: loginEmail,
      password: loginPassword,
    };
    API.login(userObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
        props.setUserName(data.user.username);
        localStorage.setItem("token", data.token);
        
        setloginEmail("");
        setloginPassword("");
        let path = `/home/${data.user.id}`;
        navigate(path);
      }else{
        setErrorMsg(false)
      }
    });
  };

  return (
    <div className="loginBody">
      <div className="loginContainer">
        <div className="loginBox">
          <div class="loginTitle">
            <h1 className="jollycoop2 jollyanimation1">J</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1 className="jollycoop2 jollyanimation3">L</h1>
            <h1 className="jollycoop2 jollyanimation1">L</h1>
            <h1 className="jollycoop2 jollyanimation2">Y</h1>
          </div>
          <h1 className="jollycoop2 jollyanimation3">-</h1>
          <div class="loginTitle">
            <h1 className="jollycoop2 jollyanimation1">C</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1 className="jollycoop2 jollyanimation3">O</h1>
            <h1 className="jollycoop2 jollyanimation1">P</h1>
          </div>
        </div>
        <div className="loginForm">
          <h1 className="loginFormh1">Login Here! </h1>
          {!errorMsg ? (<p className="error" id="errorMsg">Your username or password is wrong!</p>) : ( null )}
         
          <div className="Login">
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
              <Button variant="danger" onClick={handleFormSubmit}>Login</Button>
              <br></br>
              <p>
                Don't have an account? <a href="/signup">Signup</a> here
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
