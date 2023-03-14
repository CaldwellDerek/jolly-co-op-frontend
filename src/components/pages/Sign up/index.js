import React, { useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Signup = (props) => {
  const [signupUsername, setsignupUsername] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
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
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      email: signupEmail,
      password: signupPassword,
      username: signupUsername,
    };
    API.signup(userObj).then((data) => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id);
      }

      localStorage.setItem("token", data.token);
      setsignupUsername("");
      setsignupEmail("");
      setsignupPassword("");

      let path = `/home/${data.user.id}`;
      navigate(path);
    });
  };

  // const routeChange= () =>{
  //     let path = "/";
  //     navigate(path);
  //   }

  return (
    <div className="signupBody">
      <div className="loginContainer">
        <div className="signupBox">
          <div class="signupTitle">
            <h1 className="jollycoop2 jollyanimation1">J</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1 className="jollycoop2 jollyanimation3">L</h1>
            <h1 className="jollycoop2 jollyanimation1">L</h1>
            <h1 className="jollycoop2 jollyanimation2">Y</h1>
          </div>
          <h1 className="jollycoop2 jollyanimation3">-</h1>
          <div class="signupTitle">
            <h1 className="jollycoop2 jollyanimation1">C</h1>
            <h1 className="jollycoop2 jollyanimation2">O</h1>
            <h1 className="jollycoop2 jollyanimation3">O</h1>
            <h1 className="jollycoop2 jollyanimation1">P</h1>
          </div>
        </div>
        <div className="signupForm">
          <div className="Signup">
            <form onSubmit={handleSignupSubmit}>
              <label htmlFor="signupUsername">Username:</label>
              <input
                type="text"
                name="signupUsername"
                value={signupUsername}
                onChange={handleFormChange}
              />{" "}
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
              <br></br>
              <Button variant="danger" onClick={handleSignupSubmit}>Signup</Button>
              <br></br>
              <p>* Password has to be at least 8 digits</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
