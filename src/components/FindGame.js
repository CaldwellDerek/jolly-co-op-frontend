import React, {useState} from 'react';
import GenerateCard from './GenerateCard'

function FindGame() {
    const [cards, setCards] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let game = document.querySelector("#search-game").value;

        const gameData = await fetch(`https://api.rawg.io/api/games?page_size=5&search=${game}&key=7d95d52e79314e3e86649fa211b6be93`);
        const response = await gameData.json();
        console.log(response.results);

        const allCards = response.results.map( (game, index) => {
            return (
                <GenerateCard key={index} img={game.background_image} name={game.name} platform={game.platforms[0].platform.name} rating={game.rating}/>
            )
        })

        setCards(allCards);
    }

    return (
        <div>
            <form className="search-game-form" onSubmit={handleSubmit}>
                <label htmlFor="search-game">Search for a Game!</label>
                <input type="text" name="search-game" id="search-game" required />
                <button type="submit">Search</button>
            </form>
            {cards}
        </div>
    );
}

export default FindGame;
