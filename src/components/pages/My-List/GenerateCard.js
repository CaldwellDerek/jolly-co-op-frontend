import React from 'react';
import API from "../../../utils/API";
import nintendo from "../../../images/nintendo-logo.png"
import pc from "../../../images/pc-logo.png"
import xbox from "../../../images/xbox-logo.png"
import ps from "../../../images/ps-logo.png"

const styleCard = {
    width: "18rem",
    margin: "10px"
}

const styleImg = {
    width: "25px",
    height: "25px",
    margin: "5px"
}

const styleButton = {
    backgroundColor: "#ec5e5e",
    borderColor: "#ec5e5e"
}

function GenerateCard(props) {
    const platformArray = props.platform.split(',');
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

    const handleDelete = (e) => {
        const gameID = e.target.getAttribute("data-game-id");
        API.deleteGame(gameID, localStorage.getItem("token")).then(data => console.log(data));
    }


    return (
        <div className="card" style={styleCard}>
            <img src={props.img} className="card-img-top" alt="Game Art"/>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Available On</p>
                <ul className="list-inline">
                    {platformList}
                </ul>
                <p className="card-text">Overall Rating: {props.rating}</p>
                <div className='d-flex flex-row'>
                    <button type="button" className="btn btn-primary me-3" style={styleButton} data-game-id={props.id} onClick={handleDelete}>Delete</button>
                    <button type="button" className="btn btn-primary center" style={styleButton} data-game-id={props.id} data-game-name={props.name} onClick={props.open}>Add to Group</button>
                </div>
            </div>
        </div>
    );
  }
  
export default GenerateCard;