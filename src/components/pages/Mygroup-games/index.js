import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import Gamecard from "./Gamecard";
import { Link } from "react-router-dom";
import Teamcard from "./Team";


const Allgamesingroup = (props) => {
  const params = useParams();
  const [games, setGame] = useState([]);
  const [newGames, setNewGame] = useState([]);
  const [group, setGroup] = useState([]);
  const [winner, setWinner] = useState(0);
  const [array, setArray] = useState([]);
  const [objarray, setObjArray] = useState([]);
  const [click, setClick] =useState(0)

  const fetchGames = () => {
    API.getGamesInaGroup(params.id, props.token).then((data) => {
      setGame(data.Games);
      setGroup(data);
    });
    // winnerMachine()
  };

  const winnerMachine = () => {
    let voteArray = [];
    let voteObjArray = [];
    //* fetch votes of each game in this group
    games.forEach((game) => {
      API.countVotesofaGame(params.id, game.id,  localStorage.getItem("token")).then((data) => {
        const gameObj = { GameId: game.id, VoteNum: data.length };
        voteArray.push(data.length);
        voteObjArray.push(gameObj);
      });
    });
    setArray(voteArray);
    setObjArray(voteObjArray);
    //* find the highest vote number
    const MaxVote = Math.max(...array);
    //* find the games with the highest vote
    const winingGame = objarray.filter((obj) => obj.VoteNum === MaxVote);
  //   //!winnerIdArray is an array with just game id
    const winnerIdArray = winingGame.map((winner) => {

      return winner.GameId;
    });
  //   //write down the winning games id
    // setWinner(winnerIdArray)
    winnerIdArray.forEach((winner)=>{
      for (let i=0;i<games.length;i++){
        if(games[i].id === winner){
          games[i].iswining = true
      }else{
        games[i].iswining = false
      }
    }
  });
}

  useEffect(() => {
    
    fetchGames();

  }, []);

  // useEffect(() => {
  //   winnerMachine();
  // }, [click]);

  return (
<div >
      <Link to={"/mygroup"} className="backtogroups">⬅️ back to {props.userName}'s group</Link>
      <div className="body">
        <div  className="yourGroup">
      <h3> {group.name}</h3>
      <div>
        {/* <button onClick={winnerMachine}>testing</button> */}
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
              iswining={game.iswining}
              key={game.id}
              setClick={setClick}
              click={click}
            />
          </div>
        ))}
      </div>
      </div>
      <br/>
      </div>
      <Teamcard token={props.token} userId={props.userId} groupId={params.id} username={props.userName}/>

    </div>
    </div>
  );
};
export default Allgamesingroup;
