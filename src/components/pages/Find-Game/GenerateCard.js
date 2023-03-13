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

function GenerateCard(props) {
    const platformList = props.platform.map((element, index)=> {
        switch (element){
            case "Xbox":
                return(
                    <div className='d-inline'>
                        <li key={index} className="list-inline-item">
                            <img src={xbox} style={styleImg} alt="game art"></img>
                        </li>
                    </div>
                );
            case "PlayStation":
                return(
                    <div className='d-inline'>
                        <li key={index} className="list-inline-item">
                            <img src={ps} style={styleImg} alt="game art"></img>
                        </li>
                    </div>
                    
                ); 
            case "PC":
                return(
                    <div className='d-inline'>
                        <li key={index} className="list-inline-item">
                            <img src={pc}  style={styleImg} alt="game art"></img>
                        </li>
                    </div>
                );
            case "Nintendo":
                return(
                    <div className='d-inline'>
                        <li key={index} className="list-inline-item">
                            <img src={nintendo} style={styleImg} alt="game art"></img>
                        </li>
                    </div>
                )
            default:
                return(
                    <div className='d-inline'>
                        <li key={index} className="list-inline-item"></li>
                    </div>
                )
        }
    });

    const handleClick = (e) => {
        e.preventDefault();

        const game = {
            name: e.target.getAttribute("data-name"),
            platforms: e.target.getAttribute("data-platforms"),
            rating: e.target.getAttribute("data-rating"),
            genres: e.target.getAttribute("data-genres")
        }

        API.saveGame(game, localStorage.getItem('token')).then(data => console.log(data));

    }

    return (
        <div className="card m-3" style={styleCard}>
            <img src={props.img} className="card-img-top" alt="Game Art"/>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Available On</p>
                <ul className="list-inline">
                    {platformList}
                </ul>
                <p className="card-text">Overall Rating: {props.rating}</p>
                <button type="button" className="btn btn-primary save-button" data-name={props.name} data-platforms={props.platform} data-rating={props.rating} 
                data-genres={props.genres} onClick={handleClick}>Save</button>
            </div>
        </div>
    );
  }
  
  export default GenerateCard;

