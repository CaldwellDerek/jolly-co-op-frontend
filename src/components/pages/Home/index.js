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
            console.log(user.Groups)

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
console.log(games);
console.log(games.imgURl);
games.forEach

useEffect(() => {
    fetchGames();
}, []);

   

     
    return (
        <div>

    <h1>Welcome {user.username},</h1>
<div className="activeGroups">
<h2>Groups</h2>
{/* {userGroups.map(group=><GroupCards title={group.title}/>)} */}

</div>
<div className="carousel-box"> 
  <ImgCarousel image={games.imgURL} imgName={games.name}/>
</div>
</div>
    )}
    
    


export default Home;