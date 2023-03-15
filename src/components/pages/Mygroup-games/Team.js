import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Sendemail from "./Email";
import Addfriend from "./Addfriend";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./style.css";

const Teamcard = (props) => {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState();
  const [show, setShow] = useState(false);
  const [isOwner, setisOwner] = useState(false);
  const [change, setChange] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click + button below to invite more friends in the group
    </Tooltip>
  );

  const profileImg = [
    "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
    "https://cdn.pixabay.com/photo/2012/12/21/10/06/kitten-71514_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/01/10/kitten-1866475_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/08/17/18/38/cat-5496162_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg",
  ];
  const profileLink = profileImg[Math.floor(Math.random() * 7 + 1)];

  const fetchGroupMembers = () => {
    API.getOneGroup(props.groupId, props.token).then((data) => {
      setUsers(data.Users);
      setGroup(data);
      if (data.OwnerId === props.userId) {
        setisOwner(true);
      }
    });
  };
  useEffect(() => {
    fetchGroupMembers();
  }, [change]);

  return (
    <section className="team">
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        {isOwner ? (
          <h4 className="section-heading">Your Team Members:</h4>
        ) : (
          <h4 className="section-heading">Team Members</h4>
        )}
      </OverlayTrigger>
      <div className="section-container">
        <Sendemail users={users} group={group} username={props.username} />
        {/* <div className="addfriend" onClick={handleShow}><h1>✚</h1></div> */}
        {users.map((user) => (
          <div className="profile">
            <img
              src={profileImg[Math.floor(Math.random() * 6 + 1)]}
              alt="cat-profile-pic"
            />
            <span className="name">{user.username}</span>
          </div>
        ))}
        <Addfriend
          users={users}
          groupId={props.groupId}
          token={props.token}
          change={change}
          setChange={setChange}
          userId={props.userId}
          username={props.username}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </section>
  );
};

export default Teamcard;
