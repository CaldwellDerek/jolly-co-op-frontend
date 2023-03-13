import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Sendemail from "./Email"
import "./style.css";

const Teamcard = (props) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [group, setGroup] = useState();


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
      console.log(data);
      setUsers(data.Users);
      setGroup(data)
    });
  };
  useEffect(() => {
    fetchGroupMembers();
  }, []);

  return (
    <section className="team">
      <h4 className="section-heading">Our Team</h4>
      <div className="section-container">
        <div className="addfriend"><h1>✚</h1></div>
        {users.map((user) => (
          <div className="profile">
            <img
              src={profileImg[Math.floor(Math.random() * 6 + 1)]}
              alt="cat-profile-pic"

            />
            <span className="name">{user.username}</span>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
            <Sendemail users={users} group={group} username={props.username}/>
    </section>
  );
};

export default Teamcard;
