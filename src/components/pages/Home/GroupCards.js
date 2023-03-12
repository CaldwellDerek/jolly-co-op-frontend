import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"

const styleCard = {
    width: "40rem",
    margin:"3px"
}
// const styleCard2 = {
//     object-fit: "cover"
// }


const GroupCards = (props) => {
const userGroups = props.user
console.log(userGroups)
    return (
        <div>

{userGroups.Groups.map((group, index)=>{

    return(
        <div className="card" style={styleCard}>
            <div className="row no gutters">
<div className="col-sm-7">
            <div className="card-body ">

        <h3 className="card-title" key={index}>Group {group.name}</h3>
            <h4 className="card-text">is playing {group.game}</h4>
            <h4 className="card-text">{group.user}</h4>
          
</div>
      </div>
<div className="col-sm-5">
 <img className="card-img img-thumbnail" src="https://media.rawg.io/media/screenshots/1d7/1d75b9d60cb5884a0b19d21df8557c0c.jpg"/>
</div>
      </div>
      </div>
      )
    })}

    </div>
    )}
    

export default GroupCards;