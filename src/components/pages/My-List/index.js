import React, {useEffect, useState} from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";

function MyList() {
    const [cards, setCards] = useState([]);

    useEffect(()=> {
        const displayGames = () => {
            try {
                API.isValidToken(localStorage.getItem("token")).then(tokenData => {
                    API.getUserData(tokenData.user.id, localStorage.getItem("token")).then(userData => {
                        const allCards = userData.Games.map( (game, index) => {
                            return (
                                <GenerateCard key={index} id={game.id} img={game.imgURL} name={game.name} platform={game.platforms} rating={game.rating} genres={game.genres}/>
                            )
                        })
                        setCards(allCards);
                    })
                });
            } catch (error) { console.log(error) };
        }
        displayGames();
    })

    return (
        <div className='find-game-container'>
            <div className='card-container'>
                {cards}
            </div>
        </div>
    );

    
}

export default MyList;
