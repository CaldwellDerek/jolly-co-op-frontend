import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"
import "./groupCard.css";



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
        <div>

{userGroups.Groups.map((group, index)=>{
if(index<2) {

    return(
        <a className="groupCardText" href={`/mygroup/${group.id}/games`}>
        <div className="card boxStyle"  >
            <div className="row no gutters">
<div className="col-sm-7 col-xs-3" >
            <div className="card-body ">

        <h3 className="card-title" id={group.id} key={index}>Group {group.name}</h3>
            <h4 className="card-text ">Current winner:  {group.game}</h4>
            <h4 className="card-text">{group.user}</h4>
          
</div>
      </div>
<div className="col-sm-5 col-xs-3">
 <img className="card-img img-thumbnail" src="https://media.rawg.io/media/screenshots/1d7/1d75b9d60cb5884a0b19d21df8557c0c.jpg"/>
</div>
      </div>
      </div>
      </a>
      )
    }else return null
    })}

    </div>
    )}
    

export default GroupCards;