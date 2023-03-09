import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import Gamecard from "../../Gamecard/Gamecard";
 
const Allgamesingroup = (props) => {
    const params= useParams()
  const [games, setGame] = useState([]);
  const [group, setGroup] = useState([]);
    const [votes, setVote]= useState([])
  useEffect(() => {
    API.getGamesInaGroup(params.id).then((data) => {
      setGame(data.Games);
      setGroup(data)
    });
  }, []);
  console.log(games)
  //TODO: GET VOTES OF THIS GROUP
  //TODO:GAME WITH HIGHEST VOTES WILL HAVE A DIFFERNET STYLE

  return (
    <div>
        <h2>Welcome to Group: {group.name}</h2>
      <h2>These games are in competition:</h2>
      <div className="container">
        {games?.map((game) => (
          <Gamecard
            name={game.name}
            img={game.imgURL}
            platforms={game.platforms}
            rating={game.rating}
            key={game.id}
          />
))}
      </div>
    </div>
  );
};

export default Allgamesingroup;
