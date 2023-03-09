import React, {useEffect, useState} from "react"
import "./style.css"
import API from "../../../utils/API"
import { useParams } from "react-router-dom"

import GroupCards from "./GroupCards.js"
import ImgCarousel from "./ImgCarousel.js"

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
useEffect(() => {
    fetchGames();
}, []);

    const gameData = fetch(`https://api.rawg.io/api/games?page_size=5&dates=2023-02-01,2023-02-20&key=7d95d52e79314e3e86649fa211b6be93`);
    const response = JSON.stringify(gameData);
    console.log("API Results:")
        console.log(response.results);

     
    return (
        <div>

    <h1>Welcome {user.username},</h1>
<div className="activeGroups">
<h2>Groups</h2>
{/* {userGroups.map(group=><GroupCards title={group.title}/>)} */}

</div>
<div>
  <ImgCarousel/>
</div>
</div>
    )}
    
    


export default Home;