import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import { Link } from "react-router-dom";
import Gamecard from "../../Gamecard/Gamecard";
import userEvent from "@testing-library/user-event";

const Allgamesingroup = (props) => {
  const [games, setGame] = useState([]);
  useEffect(() => {
    API.getGamesInaGroup(4).then((data) => {
      console.log(data);
      setGame(data.Games);
    });
  }, []);

  return (
    <div>
      <h2>These games are in competition:</h2>
      <div className="container">
        {games.map((game) => (
          <Gamecard
            name={game.name}
            img={game.imgURL}
            platforms={game.platforms}
            rating={games.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Allgamesingroup;
