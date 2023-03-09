import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";

const styleCard = {
  width: "18rem",
  margin: "10px",
};

function Gamecard(props) {
  const params = useParams();
  const [count, setCount] = useState(0);
  const [vote, setVote] = useState(0);
  // const platformList = props.platform.map((element, index)=> {
  //     return <li className="list-group-item" key={index}>{element}</li>
  // });
  const fetchGameVoteofaUser = () => {
    API.countVotesofaUserofaGame(
      params.id,
      props.userId,
      props.id,
      props.token
    ).then((data) => {
      console.log(data);
    });
  };
  const createVote = () => {
    const voteObj = { GameId: props.id };
    API.createVoteInaGroup(params.id, voteObj, props.token).then((data) => {
      console.log(data);
      setCount(vote + 1)
    });
  };
  const deleteVote = () => {
    const voteObj = { GameId: props.id };
    API.deteleaGroup(params.id, voteObj, props.token).then((data) => {
      console.log(data);
      setCount(vote - 1)
    });
  };
  const fetchGameVote = () => {
    API.countVotesofaGame(props.id, params.id, props.token).then((data) => {
      console.log(data);
      setVote(data.length);
      setCount(vote);
    });
  };

  useEffect(() => {
    fetchGameVote();
  }, []);

  return (
    <div className="card" style={styleCard}>
      <img src={props.img} className="card-img-top" alt="Game Art" />
      <div className="card-body d-flex flex-column justify-content-between align-items-center">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Available On</p>
        <ul className="list-group"></ul>
        <p className="card-text">Overall Rating: {props.rating}</p>
        <div>
        <button
          type="button"
          onClick={() => createVote()}
          className="btn btn-primary"
        >
          👆🏼 Vote
        </button>
        <button
          type="button"
          onClick={() => deleteVote()}
          className="btn btn-primary"
        >
          👇🏼 Cancle
        </button>
        </div>
        <br></br>
        <p>⛳️ Current: {count}</p>
      </div>
    </div>
  );
}

export default Gamecard;
