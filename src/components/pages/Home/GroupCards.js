import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"
import "./groupCard.css";
import groupIcon from "./../../../images/groupicon1.png"



// const styleCard2 = {
//     object-fit: "cover"
// }


const GroupCards = (props) => {
const userGroups = props.user
console.log("user:",userGroups)
// routeGroup = () =>{
// this.context.router.push(`/mygroup/${group.id}`)
// }
    return (
        <div className="card-container">

{userGroups.Groups.map((group, index)=>{
if(index<2) {

    return(
        <a className="groupCardText" href={`/mygroup/${group.id}/games`}>
        <div className="card boxStyle"  >
 <img className="card-img-top" src={groupIcon}/>
            <div className="card-body ">
        <h3 className="card-title text-center" id={group.id} key={index}>{group.name}</h3>
        {(userGroups.id === group.OwnerId) ? (
            <h4 className="card-text text-center">👑</h4>
            ) : (
                <h4 className="card-text text-center">🤺</h4>
            ) }

          
</div>
      </div>
<div className="col-sm-5 col-xs-3">
</div>
      </a>
      )
    }else return null
    })}

    </div>
    )}
    

export default GroupCards;