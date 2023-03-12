import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Groupcard from "./Groupcard";
import API from "../../../utils/API";


// import JollyGroup from './components/Group'

const MyGroups = (props) => {
  const [groups, setGroups] = useState([]);

  //get all groups under this user

  const findGroup = () => {
    API.getUserData(props.userId, props.token).then((data) => {
      //save all groups infor under this user
      setGroups(data.Groups);
    });
  };

  useEffect(() => {
    findGroup();

  }, []);

  return (
    <div>
        <div className="mygroups">
        <h1 className="JollyH1">{props.userName}'s groups:</h1>
      <br></br>
      <h5>👇🏼Click to see what games are competing in the group</h5>
        </div>
      <div className="mygroupscontainer">
      {groups.map((group)=>(
           <Groupcard name={group.name} id={group.id} key={group.id} token={props.token} userId={props.userId}/>
        ))} 
        {/* {groups.map(group=><JollyGroup name={group.name} owner={group.OwnerId.user} members={group.Users} games={group.games}/>)} */}
        {/* ?? on how to map within a map for users and for games */}
        {/* how to show the map result */}
      </div>
      <br></br>
      <div className="NewGroup">
        <Link to="/findfriend" className="start-new groupbtn">
          Start a new group
        </Link>
      </div>
    </div>
  );
};
export default MyGroups;
