import React, {useEffect, useState} from "react"
import "./style.css"
import API from "../../../utils/API"
import { useParams } from "react-router-dom"

import GroupCards from "./GroupCards.js"
import  ImgCarousel  from "./ImgCarousel.js"

function Home(props){
    const params = useParams()
    console.log(params)
    const [user, setUser] = useState({})
    const fetchUser = () => {
        API.getUserData(params.id, props.token).then((data) => {
            setUser(data);
            

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

const [games, setGames] = useState([]);
const fetchGames = () => {
    API.getAllGames().then((data) => {
        setGames(data)
    })
}

console.log(user)

useEffect(() => {
    fetchGames();
}, []);

   

     
    return (
        <div>

    <h1>Welcome {user.username},</h1>
<div className="activeGroups">
<h2>Groups</h2>
{user.Groups ? (
<GroupCards user={user}/>

) : (
    <h4>You currently have no groups</h4>
)}

</div>
<div className="carousel-box"> 
  <ImgCarousel games={games}/>
</div>
</div>
    )}
    
    


export default Home;