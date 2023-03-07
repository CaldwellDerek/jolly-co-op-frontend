import React, {useState} from 'react';
import GenerateCard from './GenerateCard'
import "../styling/FindGame.css"

function FindGame() {
    const [cards, setCards] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let game = document.querySelector("#search-game").value;

        const gameData = await fetch(`https://api.rawg.io/api/games?page_size=5&search=${game}&key=7d95d52e79314e3e86649fa211b6be93`);
        const response = await gameData.json();

        let platforms = [];

        for (let obj of response.results){
            let currentPlatforms = [];
            for (let index of obj.platforms){
                currentPlatforms.push(index.platform.name);
            }
            platforms.push(currentPlatforms);
        }
        
        console.log(response.results);
        
        const allCards = response.results.map( (game, index) => {
            return (
                <GenerateCard key={index} img={game.background_image} name={game.name} platform={platforms[index]} rating={game.rating}/>
            )
        })

        setCards(allCards);
    }

    return (
        <div className='find-game-container'>
            <form className="search-game-form" onSubmit={handleSubmit}>
                <label htmlFor="search-game" className="form-label">Search for a Game!</label>
                <input type="text" id="search-game" className="form-control" name="search-game"/>
                <button className="search-button btn btn-primary" type="submit">Search</button>
            </form>
            <div className='card-container'>
                {cards}
            </div>
        </div>
    );
}

export default FindGame;
