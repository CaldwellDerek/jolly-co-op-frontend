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
  const [emailAlert,setemailAlert] = useState("")
  const [emailContent, setemailContent] = useState("");
  const [recipientEmailAddress, setrecipientEmailAddress] = useState("");
  const handleFormChange = (e) => {
    console.log(e.target.value);
    const { name, value,  } = e.target;
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
      recipient:recipientEmailAddress.split(":")[0],
      email: recipientEmailAddress.split(":")[1],
      sender:props.username,
      groupname:props.group.name,
      text:emailContent
    };
    console.log(emailObj)
    API.sendEmail(emailObj).then((data)=>{
      console.log(data)
      setemailAlert("Your message has been sent!")
    })
  };
  const emailText =  `${props.username} from ${props.group.name} in JOLLY-COOP is inviting you to vote!`

  useEffect(() => {
    setemailContent(emailText)
    
  }, []);

  return (
    <div>
      <div className="emailbtn box">
        <p onClick={handleShow}>
          Let your friends know about these games and vote for your favorite
          one!
        </p>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EMAIL TO YOUR FRIEND</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Select the email address to your friend in the group. Rally for your
          favorite game!
          <br></br>
          <br></br>
          <label for="emailaddress">Choose the email address</label>
          <br></br>
          <br></br>
          <select
            name="recipientEmailAddress"
            id="emailaddress"
            value={recipientEmailAddress}
            onChange={handleFormChange}
          >
            {props.users.map((user) => (
              <option>{user.username}:{user.email}</option>
            ))}
          </select>
          <br></br>
          <br></br>
          <textarea
            name="emailContent"
            value={emailContent}
            className="emailContent"
            onChange={handleFormChange}
          ></textarea>
          <p>{emailAlert}</p>
        </Offcanvas.Body>
        <Button variant="primary" onClick={handleFormSubmit}>
          Send
        </Button>{" "}
      </Offcanvas>
    </div>
  );
};

export default Sendemail;
