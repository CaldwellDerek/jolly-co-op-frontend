import "./groupcardstyle.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/API";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const Groupcard = (props) => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [owner, setOwner] = useState(false);
  const [className, setClassName] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [msg, setMsg]=useState("")
  const [variant, setVariant] =useState("light")
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {msg}
    </Tooltip>
  );
    const leaveGroup = ()=>{
      API.leaveGroup(props.id,props.token).then((data)=>{
        console.log(data)
        setMsg("You have left this group")
        setVariant("danger")
      })
    }

  const link = `/mygroup/${props.id}/games`;
  const findGroup = () => {
    API.getOneGroup(props.id, props.token).then((data) => {
      setUsers(data.Users.length);
      setGames(data.Games.length);
      if (data.OwnerId === props.userId){
        setOwner(true)
      }
      if (owner === true){
        setMsg("You are the group owner. Leaving the group would erase all data of the group")
      } else{
        setMsg("Leaving the group would lose all votes and game data")
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
      <Link to={link}  className="panel">
      {owner?<p className="identity">👑</p>:<p className="identity"></p>}
        <div className="ring">
          <div className={className}></div>
          <div className="border">
            <p className={fontColor}>{props.name}</p>
            <div className="slide">
              <h6 className="para">Details of</h6>
              <h4 className="groupName">
                <strong>{props.name}</strong>
              </h4>
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
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {owner?<Button onClick={()=>leaveGroup()} variant={variant}>Dismiss this group</Button>:<Button onClick={()=>leaveGroup()} variant={variant}>Leave this group</Button>}
    </OverlayTrigger>
    </div>
  );
};

export default Groupcard;
