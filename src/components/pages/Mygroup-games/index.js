import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import Gamecard from "./Gamecard";
import { Link } from "react-router-dom";
import Sendemail from "../../email/email";

const Allgamesingroup = (props) => {
  const params = useParams();
  const [games, setGame] = useState([]);
  const [group, setGroup] = useState([]);
  const [style, setStyle] = useState("regularcard");

  const fetchGames = () => {
    API.getGamesInaGroup(params.id, props.userId).then((data) => {
      setGame(data.Games);
      setGroup(data);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
<div>
      <Link to={"/mygroup"}>⬅️ back to my group</Link>
      <div className="body">
      <h3> {group.name}</h3>
      <h4>{props.userName}</h4>
      {/* <h3>These games are in competition:</h3> */}
      <div className="container">
        {games?.map((game) => (
          <div className="regularcard">
            <Gamecard
              name={game.name}
              img={game.imgURL}
              platforms={game.platforms}
              rating={game.rating}
              id={game.id}
              token={props.token}
              userId={props.userId}
              games={games}
            />
          </div>
        ))}
      </div>
      <br/>
      <p>Let your friends know about these games and vote for your favorite one!</p>
      <Sendemail />
    </div>
    </div>
  );
};
export default Allgamesingroup;
