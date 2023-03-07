import React from 'react';

function GenerateCard(props) {
    return (
        <div className='game-card'>
            <img src={props.img} alt="Game Art"/>
            <h3>{props.name}</h3>
            <p>{props.platform}</p>
            <p>{props.rating}</p>

            <button className="save-button" type='button'>Save</button>
        </div>
    );
  }
  
  export default GenerateCard;