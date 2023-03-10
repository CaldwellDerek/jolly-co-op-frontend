import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import Button from "react-bootstrap/Button";

function Gamecard(props) {
  const params = useParams();
  //Vote of a game
  const [vote, setVote] = useState(0);
  const [usergamevote, setUsergamevote] = useState(false);
  const [usergroupvote, setUsergroupvote] = useState(false);
  const [array, setArray] = useState([]);
  const [objarray, setObjArray] = useState([]);
  const [winner, setWinner] = useState();
  const [checkvote, setCheckVote] = useState(0);

  // const platformList = props.platform.map((element, index)=> {
  //     return <li className="list-group-item" key={index}>{element}</li>
  // });

  //find how many votes has this user voted for this game, Maxiam 1

  const winnerMachine = () => {
    let voteArray = [];
    let voteObjArray = [];
    //* fetch votes of each game in this group
    props.games.forEach((game) => {
      API.countVotesofaGame(game.id, params.id, props.token).then((data) => {
        const gameObj = { GameId: game.id, VoteNum: data.length };
        voteArray.push(data.length);
        voteObjArray.push(gameObj);
      });
    });
    setArray(voteArray);
    setObjArray(voteObjArray);
    // console.log("here is object array: ")
    // console.log(voteObjArray)
    //* find the highest vote number
    const MaxVote = Math.max(...array);
    // console.log( "MaxVote is "+MaxVote)
    // console.log(typeof MaxVote)
    //* find the games with the highest vote
    const winingGame = objarray.filter((obj) => obj.VoteNum === MaxVote);
    // console.log("winner is:")
    // console.log(winner)
    // console.log("Winner is ")
    // console.log(props.winner);
    const winnerIdArray = winingGame.map((winner) => {
      return winner.GameId;
    });
    // console.log("Winner Id array is ")
    console.log(winnerIdArray);
    //* pass the winner style
    if (winnerIdArray.includes(props.id)) {
      setWinner(true);
      // console.log("game:" + props.id);
      // console.log(winner);
    }
  };

  const fetchGameVoteofaUser = () => {
    API.countVotesofaUserofaGame(
      params.id,
      props.userId,
      props.id,
      props.token
    ).then((data) => {
      if (data.count == 1) {
        // console.log("---------------------")
        setUsergamevote(false);
      } else {
        setUsergamevote(true);
      }
    });
  };

  //find how many votes has this user voted in this group, Maxiam 2
  const fetchGameVoteofaUserinGroup = () => {
    API.countVotesofaUserinaGroup(params.id, props.id, props.token).then(
      (data) => {
        // console.log(data)
        if (data.count == 2) {
          setUsergroupvote(false);
        } else {
          setUsergroupvote(true);
        }
      }
    );
    // console.log("game:" + props.id);
    // console.log(vote);
  };

  const createVote = () => {
    const voteObj = { GameId: props.id };
    API.createVoteInaGroup(params.id, voteObj, props.token).then((data) => {
      // console.log(data);
      if (!data.msg) {
        setVote(vote + 1);
        winnerMachine()
      }
    });
  };
  const deleteVote = () => {
    const voteObj = { GameId: props.id };
    API.deteleaGroup(params.id, voteObj, props.token).then((data) => {

      setVote(vote - 1);
      winnerMachine()
    });
  };

  const fetchGameVote = () => {
    API.countVotesofaGame(props.id, params.id, props.token).then((data) => {
      // console.log(data);
      setVote(data.length);
    });
  };

  useEffect(() => {
    fetchGameVote();
    winnerMachine();
  }, []);

  useEffect(() => {
    fetchGameVoteofaUserinGroup();
    fetchGameVoteofaUser();
    // if (checkvote === 0) {
    //   setCheckVote(1);
    // } else {
    //   setCheckVote(0);
    // }
  }, [vote]);

  // useEffect(() => {
  //   winnerMachine();
  // }, [checkvote]);

  return (
    <div className="regularcard">
      <div className="card">
        <img src={props.img} className="card-img-top" alt="Game Art" />
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Available On:</p>
          <ul className="list-group">{props.platforms}</ul>
          <p className="card-text">Overall Rating: {props.rating}</p>
          {usergamevote ? (
            <button
              type="button"
              onClick={() => createVote()}
              className="btn btn-primary"
            >
              👆🏼 Vote
            </button>
          ) : (
            <Button onClick={() => deleteVote()} variant="danger">
              👇🏼 Cancle
            </Button>
          )}
          <br></br>
          <p>⛳️ Current: {vote}</p>
        </div>
      </div>
      {winner ? (<p className="winner">👑</p>) : (<p className="loser">🤺</p>)}
    </div>
  );
}

export default Gamecard;
