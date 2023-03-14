import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";

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
    API.countVotesofaGame(params.id, props.userId, props.id, props.token).then(
      (data) => {
        console.log(data);
      }
    );
  };

  const fetchGameVote = () => {
    API.countVotesofaGame(props.id, params.id, props.token).then((data) => {
      console.log(data);
      // setVote(data.count)
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
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="btn btn-primary"
        >
          👆🏼 Vote
        </button>
        <br></br>
        <p>⛳️ Current: {vote}</p>
      </div>
    </div>
  );
}

export default Gamecard;
