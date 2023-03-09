import React, {useEffect, useState} from "react"
import "./style.css"
import API from "../../../utils/API"
import { useParams } from "react-router-dom"
import GroupCards from "./GroupCards.js"
import Carousel from "./Carousel.js"

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

    const gameData = fetch(`https://api.rawg.io/api/games?page_size=5&dates=2023-02-01,2023-02-20&key=7d95d52e79314e3e86649fa211b6be93`);
    const response = JSON.stringify(gameData);
    console.log("API Results:")
        console.log(response.results);

        // const carImages = response.results.map( ())
    // const userGroups = user.Group
    // console.log(userGroups)
    return (
        <div>

    <h1>Welcome {user.username},</h1>
<div className="activeGroups">
<h2>Groups</h2>
{/* {userGroups.map(group=><GroupCards title={group.title}/>)} */}



{/* {user.Groups.map((group) => {
    <GroupCards
    name={group.name}
    game={group.game}
    key={group.id}
    />
})} */}
{/* {user.group.map((group) => (
    <GroupCards 
    fetchData={fetchUser}
    token={props.token}
    name={group.name}
    game = {group.Game}
    key= {group.id}

    />
))} */}
</div>

{/* <Carousel key={index} img={game.background_image} name={game.name}/> */}
</div>
    );
}

    
    


export default Home;