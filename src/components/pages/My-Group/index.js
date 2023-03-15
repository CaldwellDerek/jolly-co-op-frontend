import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Groupcard from "./Groupcard";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";

const MyGroups = (props) => {
  const [groups, setGroups] = useState([]);
  const [num, setNum] = useState(0);
  const [user, setUser] = useState(0);
 

  //get all groups under this user

  const findGroup = () => {
    API.isValidToken(localStorage.getItem("token")).then(tokenData => {
      console.log(tokenData)
      API.getUserData(tokenData.user.id, localStorage.getItem("token")).then((data) => {
        //save all groups infor under this user
        console.log(data)
        setGroups(data.Groups);
        setUser(data.username)
        
      });
    })
  };

  useEffect(() => {
findGroup()
  },[])

  return (
    <div className="classBody">
      <div className="mygroups">
        <h1 className="JollyH1">{user}'s groups:</h1>
        <br></br>
        <h5>Click to see what games are competing in the group</h5>
        <div className="NewGroup">
        <Link to="/findfriend" className="button-74">
          Start a new group
        </Link>
      </div>
      </div>
      <div className="mygroupscontainer">
        {groups.map((group) => (
          <Groupcard
            name={group.name}
            id={group.id}
            key={group.id}
            token={props.token}
            userId={props.userId}
          />
        ))}
        {/* ?? on how to map within a map for users and for games */}
        {/* how to show the map result */}
      </div>
      <br></br>
    </div>
  );
};
export default MyGroups;
