import "./groupcardstyle.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/API";
import CancleButton from "./Button";

const Groupcard = (props) => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [owner, setOwner] = useState(false);
  const [className, setClassName] = useState("");
  const [fontColor, setFontColor] = useState("");

  const link = `/mygroup/${props.id}/games`;
  const findGroup = () => {
    API.getOneGroup(props.id, props.token).then((data) => {
      setUsers(data.Users.length);
      setGames(data.Games.length);
      console.log(data.OwnerId === props.userId)
      if (data.OwnerId === props.userId){
        setOwner(true)
      }
    });
  };

  const cardNum = ()=>{
    const classNum = Math.floor(Math.random()*4+1)
    if (classNum === 1){
      setClassName("card1")
      setFontColor("title1")
    }else if(classNum ===2){
      setClassName("card2")
      setFontColor("title2")
    }else if(classNum ===3){
      setClassName("card3")
      setFontColor("title3")
    }else{
      setClassName("card4")
      setFontColor("title4")
    }
  }

  useEffect(() => {
    findGroup();
    cardNum()
  }, []);

  return (
    <div className="groupcontainer">
      {owner?<p className="identity">👑</p>:<p className="identity">🤺</p>}
      <Link to={link}  className="panel">
        <div className="ring">
          <div className={className}></div>
          <div className="border">
            <p className={fontColor}>{props.name}</p>
            <div className="slide">
              <h6 className="para">Details of</h6>
              <h6 className="groupName">
                <strong>{props.name}</strong>
              </h6>
              <div className="line">
                <h6 className="para">Num of Users</h6>{" "}
                <i className="fa fa-plane" aria-hidden="true"></i>
                <h6 className="para">{users}</h6>
              </div>
              <div className="line">
                <h6 className="para">Num of Games</h6>{" "}
                <i className="fa fa-plane" aria-hidden="true"></i>
                <h6 className="para">{games}</h6>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <br></br>
      <CancleButton id={props.id} token={props.token} userId={props.userId}/>
    </div>
  );
};

export default Groupcard;
