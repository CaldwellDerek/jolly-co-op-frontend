import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";

const Sendemail = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [emailAlert, setemailAlert] = useState("");
  const [emailContent, setemailContent] = useState("");
  const [recipientEmailAddress, setrecipientEmailAddress] = useState("");

  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    switch (name) {
      case "emailContent":
        setemailContent(value);
        break;
      case "recipientEmailAddress":
        setrecipientEmailAddress(value);
        break;
      default:
        break;
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailObj = {
      recipient: recipientEmailAddress.split(":")[0],
      email: recipientEmailAddress.split(":")[1],
      sender: props.username,
      groupname: props.group.name,
      text: emailContent,
    };
    console.log(emailObj);
    API.sendEmail(emailObj).then((data) => {
      console.log(data);
      setemailAlert("Your message has been sent!");
    });
  };

  const emailText = `${props.username} in JOLLY-COOP is inviting you to vote!`;

  useEffect(() => {
    console.log(props.group);
    setemailContent(emailText);
  }, []);

  return (
    <div className="profile">
      <img
        onClick={handleShow}
        src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
      ></img>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="addfriend">
          <Offcanvas.Title>
            Email to your friend
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="addfriend">
          <div className="searchEmail">
            <p>
              Select the email address to your friend in the group. Rally for
              your favorite game!
            </p>
            <br></br>
            <label for="emailaddress">Choose the email address</label>
            <br></br>
            <select
              name="recipientEmailAddress"
              id="emailaddress"
              value={recipientEmailAddress}
              onChange={handleFormChange}
            >
              {props.users.map((user) => (
                <option>
                  {user.username}:{user.email}
                </option>
              ))}
            </select>
            <br></br>
            <br></br>
          </div>
          <br></br>
          <div className="currentTeam">
            <textarea
              name="emailContent"
              value={emailContent}
              className="emailContent"
              onChange={handleFormChange}
            ></textarea>
            <p>{emailAlert}</p>
          </div>
          <br></br>
          <Button variant="primary" onClick={handleFormSubmit}>
            Send
          </Button>{" "}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sendemail;
