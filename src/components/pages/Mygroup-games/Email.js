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

    const emailText =  `from ${props.group.name} in JOLLY-COOP is inviting you to vote!
    `
    return (
        <div>
          <div className="emailbtn box">
          <p onClick={handleShow}>Let your friends know about these games and vote for your favorite one!</p>
          </div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EMAIL TO YOUR FRIEND</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Select the email address to your friend in the group. Rally for your favorite game!
          <br></br>
          <br></br>
          <label for="emailaddress">Choose the email address</label>
          <br></br>
          <br></br>
          <select name="emailaddress" id="cars">
            {props.users.map((user)=>(
            <option value={user.id}>{user.email}</option>
            ))}
          </select>
          <br></br>
          <br></br>
          <textarea>{emailText}</textarea>
        </Offcanvas.Body>
        <Button variant="primary">Send</Button>{" "}
      </Offcanvas>
      </div>
    )
}

    export default Sendemail;