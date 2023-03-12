import './groupcardstyle.css'
import React,  { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import API from '../../../utils/API'

const Groupcard = (props)=>{

  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);

    const link = `/mygroup/${props.id}/games`
     const findGroup = ()=>{
      API.getOneGroup(props.id, props.token).then((data=>{
        console.log(data)
        setUsers(data.Users.length)
        setGames(data.Games.length)
      }))
     }

     useEffect(() => {
      findGroup();
  
    }, []);


return (
<Link to={link} className="groupcontainer">
  <div className="panel">
    <div className="ring">
      <div className="groupcard card1"></div>
      <div className="border">
        <p className="title">{props.name}</p>
        <div className="slide">
          <h6 className="para">Details of</h6>
          <h6 className='groupName'><strong>{props.name}</strong></h6>
          <div className="line">
            <h6 className="para">Num of Users</h6> <i className="fa fa-plane" aria-hidden="true"></i>
            <h6 className="para">{users}</h6>
          </div>
          <div className="line">
            <h6 className="para">Num of Games</h6> <i className="fa fa-plane" aria-hidden="true"></i>
            <h6 className="para">{games}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</Link>
)
}

export default Groupcard