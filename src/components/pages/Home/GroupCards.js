import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"

const GroupCards = (props) => {
const userGroups = props.user
console.log(userGroups)
    return (
        <div>

{userGroups.Groups.map((group, index)=>{
    return(
        <div className="card">
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
<div>
        <h3 className="card-title">Group {group.name} </h3>
            <h4 className="card-text">is playing {group.game}</h4>
            <h4 className="card-text">{group.user}</h4>
     </div>      
      
      </div>
      </div>
      )
    })}
    </div>
    )}
    

export default GroupCards;