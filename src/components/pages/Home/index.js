import React, {useEffect, useState} from "react"
import "./style.css"
import API from "../../../utils/API"
import { useParams } from "react-router-dom"
import GroupCards from "./GroupCards.js"

function Home(props){
    const params = useParams()
    console.log(params)
    const [user, setUser] = useState({})
    const fetchUser = () => {
        API.getUserData(params.id, props.token).then((data) => {
            setUser(data);
            console.log(props.token)

        })
    }
    useEffect(() => {
        fetchUser();
    }, [params.id])
    const [groups, setGroups] = useState([]);
    const fetchGroups = () => {
        API.getAllGroups().then((data) => {
setGroups(data);
        })
    }
    useEffect(() => {
        fetchGroups();
    }, []);
    
    
    return (
        <div>

    <h1>Welcome {user.username},</h1>
<div className="activeGroups">
<h2>Groups</h2>
{groups.map((group) => (
    <GroupCards 
    fetchData={fetchGroups}
    token={props.token}
    name={group.name}
    game = {group.Game}
    key= {group.id}

    />
))}
</div>

        </div>
    )
}

export default Home;