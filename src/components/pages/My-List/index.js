import React from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";

let allCards = [];
const displayGames = () => {
    API.isValidToken(localStorage.getItem("token")).then(tokenData => {
        API.getUserData(tokenData.user.id, localStorage.getItem("token")).then(userData => {
            allCards = userData.Games.map( (game, index) => {
                return (
                    <GenerateCard key={index} id={game.id} img={game.imgURL} name={game.name} platform={game.platforms} rating={game.rating} genres={game.genres}/>
                )
            })
            
        })
    });
}


function MyList() {
    displayGames();
    return (
        <div className='find-game-container'>
            <div className='card-container'>
                {allCards}
            </div>
        </div>
    );

    
}

export default MyList;
