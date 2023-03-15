import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/API";
import Button from "react-bootstrap/Button";
import { CloseButton } from "react-bootstrap";
import nintendo from "../../../images/nintendo-logo.png"
import pc from "../../../images/pc-logo.png"
import xbox from "../../../images/xbox-logo.png"
import ps from "../../../images/ps-logo.png"

const styleImg = {
  width: "25px",
  height: "25px",
  margin: "5px"
}

function Gamecard(props) {
  const params = useParams();
  const [owner, setOwner] = useState(false);
  //Vote of a game
  const [vote, setVote] = useState(0);
  const [alert, setAlert] = useState(0);
  const [usergamevote, setUsergamevote] = useState(false);
  const [usergroupvote, setUsergroupvote] = useState(false);
  const [msg, setmsg]=useState("")
  const [button, setButton]=useState(false)
  const [divStyle, setdivStyle]=useState("box")


  const platformArray = props.platforms.split(',');
  const platformList = platformArray.map((element, index)=> {
    switch (element){
        case "Xbox":
            return(
                <div key={index} className='d-inline'>
                    <li className="list-inline-item">
                        <img src={xbox} style={styleImg} alt="game art"></img>
                    </li>
                </div>
            );
        case "PlayStation":
            return(
                <div key={index} className='d-inline'>
                    <li className="list-inline-item">
                        <img src={ps} style={styleImg} alt="game art"></img>
                    </li>
                </div>
                
            ); 
        case "PC":
            return(
                <div key={index} className='d-inline'>
                    <li className="list-inline-item">
                        <img src={pc}  style={styleImg} alt="game art"></img>
                    </li>
                </div>
            );
        case "Nintendo":
            return(
                <div key={index} className='d-inline'>
                    <li className="list-inline-item">
                        <img src={nintendo} style={styleImg} alt="game art"></img>
                    </li>
                </div>
            )
        default:
            return(
                <div key={index} className='d-inline'>
                    <li className="list-inline-item"></li>
                </div>
            )
    }
});

  const deleteGame =()=>{
    API.deleteGamefromaGroup(params.id, props.id, props.token).then(
      (data)=>{
        console.log(data)
        setmsg("You have deleted the game")
        setButton(true)
        setdivStyle("deletebox")
      }
    )
  }
  
  const findGroup = () => {
    API.getOneGroup(params.id, props.token).then((data) => {
      if (data.OwnerId === props.userId){
        setOwner(true)
      }
  })
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
  };

  const createVote = () => {
    const voteObj = { GameId: props.id };
    API.createVoteInaGroup(params.id, voteObj, props.token).then((data) => {
      // console.log(data);
      if (!data.msg) {
        setVote(vote + 1);
      }})
      if (alert ===0){
        setAlert(1)
      }else{
        setAlert(0)
      }
    }
  
  const deleteVote = () => {
    const voteObj = { GameId: props.id };
    API.deteleaGroup(params.id, voteObj, props.token).then((data) => {
      if(data.msg == "the vote has been deleted"){
        setVote(vote - 1);
      }
    });
    if (alert ===0){
      setAlert(1)
    }else{
      setAlert(0)
    }
  };

  const fetchGameVote = () => {
    API.countVotesofaGame(params.id,props.id,  props.token).then((data) => {
      setVote(data.length)
    });
  };

  useEffect(() => {
    fetchGameVote();
    findGroup()
  }, []);

  useEffect(() => {
    fetchGameVoteofaUserinGroup();
    fetchGameVoteofaUser();

  }, [vote]);

// useEffect(()=>{
//   if (props.click ===0){
//     props.setClick(1)
//   }else{
//     props.setClick(0)
//   }
// },[alert])



  return (
    <div className={divStyle}>
           
      {/* {props.iswining?<div className="winnerBanner"><p>👑</p></div>:<div className="losingBanner"><p>👏</p></div>} */}
      <div className="card">
      {owner &&<CloseButton className="delete" onClick={deleteGame}/>}
        <img src={props.img} className="card-img-top" alt="Game Art" />
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Available On:</p>
          <ul className="list-group d-flex">{platformList}</ul>
          <p className="card-text">Overall Rating: {props.rating}</p>
          {usergamevote ? (
            <button
              type="button"
              onClick={() => createVote()}
              className="btn btn-primary"
              id="voteBtn"
              disabled={button}
            >
              👆🏼 Vote
            </button>
          ) : (
            //call fakevote
            <Button onClick={() => deleteVote()} variant="danger" id="cancleBtn" disabled={button}>
              👇🏼 Cancle
            </Button>
          )}
          <br></br>
          <p>⛳️ Current: {vote}</p>
  
        </div>
      </div>
    </div>
  );
}

export default Gamecard;
