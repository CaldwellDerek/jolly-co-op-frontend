import React, {useState} from 'react';
import GenerateCard from './GenerateCard'

function FindGame() {
    const [cards, setCards] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let game = document.querySelector("#search-game").value;

        const gameData = await fetch(`https://api.rawg.io/api/games?page_size=10&search=${game}&key=7d95d52e79314e3e86649fa211b6be93`);
        const response = await gameData.json();

        let platforms = [];

        for (let obj of response.results){
            let currentPlatforms = [];
            for (let index of obj.platforms){
                const plat = index.platform.name;
                if (plat.includes("Xbox")){
                    currentPlatforms.push("Xbox");
                } else if (plat.includes("PlayStation")){
                    currentPlatforms.push("PlayStation")
                } else if (plat.includes("PC")){
                    currentPlatforms.push("PC")
                } else if (plat.includes("Nintendo")){
                    currentPlatforms.push("Nintendo")
                } else if (plat.includes("Game Boy")){
                    currentPlatforms.push("Nintendo")
                } else if (plat.includes("Wii")){
                    currentPlatforms.push("Nintendo")
                }  else if (plat.includes("NES")){
                    currentPlatforms.push("Nintendo")
                } else if (plat.includes("GameCube")){
                    currentPlatforms.push("Nintendo")
                } else if (plat.includes("Web")){
                    currentPlatforms.push("Web")
                }
            }
            platforms.push(currentPlatforms);
        }

        const filteredPlatforms = [];
        for (let array of platforms){
            const tempArray = array.filter( (element, index) => {
                return array.indexOf(element) === index;
            });
            filteredPlatforms.push(tempArray);
        }
        
        const genres = [];
        for (let obj of response.results){
            genres.push(obj.genres.map((element, index)=> {
                return element.name;
            }));
        }
        
        const allCards = response.results.map( (game, index) => {
            return (
                <GenerateCard key={index} img={game.background_image} name={game.name} platform={filteredPlatforms[index]} rating={game.rating} genres={genres[index]}/>
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
