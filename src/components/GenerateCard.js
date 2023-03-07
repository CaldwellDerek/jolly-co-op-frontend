import React from 'react';

function GenerateCard(props) {
    return (
        <div className='game-card'>
            <img src={props.img} alt="Game Art"/>
            <h3>{props.name}</h3>
            <p>Platforms: {props.platform}</p>
            <p>Ratings: {props.rating}</p>

            <button className="save-button" type='button'>Save</button>
        </div>
    );
  }
  
  export default GenerateCard;