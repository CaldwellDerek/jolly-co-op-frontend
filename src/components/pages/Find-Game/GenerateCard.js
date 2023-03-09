import React from 'react';
import API from "../../../utils/API";

const styleCard = {
    width: "18rem",
    margin: "10px"
}

function GenerateCard(props) {
    const platformList = props.platform.map((element, index)=> {
        return <li className="list-group-item" key={index}>{element}</li>
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
        <div className="card" style={styleCard}>
            <img src={props.img} className="card-img-top" alt="Game Art"/>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Available On</p>
                <ul className="list-group">
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