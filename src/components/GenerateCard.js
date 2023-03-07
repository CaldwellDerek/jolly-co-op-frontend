import React from 'react';

function GenerateCard(props) {
    return (
        <div className='gameCard'>
            <image src={props.img}/>
            <h3>{props.name}</h3>
            <p>{props.platform}</p>
            <p>{props.rating}</p>

            <button type='button'>Save</button>
        </div>
    );
  }
  
  export default GenerateCard;