import React, {useState,useEffect} from "react";
import './style.css'
import {Link} from "react-router-dom"
import FindFriend from "../Find-Friend";

// import JollyGroup from './components/Group'


const MyGroups = () => {
    // const [groups, setGroups] = useState([])

    return (
    <div>
            <h1 className="JollyH1">My jolly groups:</h1>
        <div className="MyGroups">
            {/* {groups.map(group=><JollyGroup name={group.name} owner={group.OwnerId.user} members={group.Users} games={group.games}/>)} */}
            {/* ?? on how to map within a map for users and for games */}
        </div>
        <div className="NewGroup">
            <Link to='/findfriend' className="start-new">Start a new group
            {/* <button className="start-new">Start a new group</button> */}
            </Link>
        </div>


    </div>

    );
}
export default MyGroups
