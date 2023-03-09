import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import Gamecard from "../../Gamecard/Gamecard";
import { Link } from "react-router-dom";

const Allgamesingroup = (props) => {
  const params = useParams();
  const [games, setGame] = useState([]);
  const [group, setGroup] = useState([]);
  const [user, setUser] = useState({});
  const [votes, setVote] = useState("");
//     const [token, setToken]= useState("");
//     const [userId, setUserId] = useState("")

//     setToken(props.token)
//   setUserId(props.userId)

  //   const fetchUser = () => {
  //     API.getUserData(params.id, props.token).then((data) => {
  //       setUser(data);
  //       console.log(props.token);
  //     });
  //   }
  const fetchGames = () => {
    API.getGamesInaGroup(params.id, props.userId).then((data) => {
      setGame(data.Games);
      setGroup(data);
    });
  };
  const fetchGroupVote = () => {
    API.getVotesInaGroup(params.id, props.userId).then((data) => {
      setVote(data.length);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

//   useEffect(() => {
//     fetchGroupVote();
//   }, []);

  //TODO: GET VOTES OF THIS GROUP
  //TODO:GAME WITH HIGHEST VOTES WILL HAVE A DIFFERNET STYLE

  return (
    <div>
      <Link to={"/mygroup"}>⬅️ back to my group</Link>
      <h2>Welcome to Group: {group.name}</h2>
      <h2>These games are in competition:</h2>
      <div className="container">
        {games?.map((game) => (
          <div className="cardbtn">
            <Gamecard
              name={game.name}
              img={game.imgURL}
              platforms={game.platforms}
              rating={game.rating}
              id={game.id}
              token={props.token}
              userId={props.userId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Allgamesingroup;
