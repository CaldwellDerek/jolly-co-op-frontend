import React from 'react';

const styleCard = {
    width: "18rem",
    margin: "10px"
}

function Gamecard(props) {
    // const platformList = props.platform.map((element, index)=> {
    //     return <li className="list-group-item" key={index}>{element}</li>
    // });
    return (
        <div className="card" style={styleCard}>
            <img src={props.img} className="card-img-top" alt="Game Art"/>
            <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Available On</p>
                <ul className="list-group">
                    {props.platforms}
                </ul>
                <p className="card-text">Overall Rating: {props.rating}</p>
                <button type="button" className="btn btn-primary">Vote</button>
            </div>
        </div>
    );
  }
  
  export default Gamecard;