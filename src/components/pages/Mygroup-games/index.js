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
  const [winner, setWinner] = useState(0);
  const [array, setArray] = useState([]);
  const [objarray, setObjArray] = useState([]);
  const [click, setClick] =useState(0)

  const fetchGames = () => {
    API.getGamesInaGroup(params.id, props.userId).then((data) => {
      setGame(data.Games);
      setGroup(data);
    });
  };

  const winnerMachine = () => {
    let voteArray = [];
    let voteObjArray = [];
    //* fetch votes of each game in this group
    games.forEach((game) => {
      API.countVotesofaGame(game.id, params.id, props.token).then((data) => {
        const gameObj = { GameId: game.id, VoteNum: data.length };
        voteArray.push(data.length);
        voteObjArray.push(gameObj);
      });
    });
    console.log(games)
    setArray(voteArray);
    setObjArray(voteObjArray);
    //* find the highest vote number
    const MaxVote = Math.max(...array);
    //* find the games with the highest vote
    const winingGame = objarray.filter((obj) => obj.VoteNum === MaxVote);
    winingGame.forEach((wininggame)=>{
      const winnergame = games.filter((game)=>game.id == wininggame.GameId)
      console.log(winnergame)
      winnergame.forEach(winnergame=>{winnergame.win = true})
      const losergame = games.filter((game)=>game.id !== wininggame.GameId)
      losergame.forEach(losergame=>{losergame.win = false})
      console.log(losergame)
    })

    //!winnerIdArray is an array with just game id
    const winnerIdArray = winingGame.map((winner) => {
      return winner.GameId;
    });
    //write down the winning games id
    setWinner(winnerIdArray)
  };
  
  //Start a function that changes state of winning object:fakevote
  // object={winner}
  //set the state of an object default 
  // function fakevote(){
  //   setfirst({
  //     ...first,
  //     whatwechanged
  //   })
  // }\
  //useEffect on first to rerender cards.

  useEffect(() => {
    fetchGames();
    winnerMachine();
  }, []);

  return (
<div>
      <Link to={"/mygroup"}>⬅️ back to my group</Link>
      <div className="body">
      <h3> {group.name}</h3>
      <h4>{props.userName}</h4>
      {/* <h3>These games are in competition:</h3> */}
      <div>
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
              win={games.win}
              // winnerIdArray={winner}
              key={game.id}
            />
          </div>
        ))}
      </div>
      </div>
      <br/>
      <p>Let your friends know about these games and vote for your favorite one!</p>
    </div>
    </div>
  );
};
export default Allgamesingroup;
