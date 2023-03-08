import React, {useState,useEffect} from "react";
const {Link, BrowserRouter} = window.ReactRouterDom
import JollyGroup from '../../Group'
import './style.css'

const MyGroups = () => {
    const [groups, setGroups] = useState([])

    return (
    <div>
        <div className="MyGroups">
            <h1>My jolly groups:</h1>
            {/* {groups.map(group=><JollyGroup name={group.name} owner={group.OwnerId.user} members={group.Users} games={group.games}/>)} */}
            {/* ?? on how to map within a map for users and for games */}
        </div>
        <div className="NewGroup">
            <Link to={'../../components/NewGroup'}>
            <button id="start-new">Start a new group</button>
            </Link>
        </div>


    </div>

    )
}
