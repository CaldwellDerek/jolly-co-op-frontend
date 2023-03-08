import React from 'react';

const styleCard = {
    width: "18rem",
    margin: "10px"
}

function GenerateCard(props) {
    const platformList = props.platform.map((element, index)=> {
        return <li className="list-group-item" key={index}>{element}</li>
    });

    const handleClick = async (e) => {
        e.preventDefault();
        const name = e.target.getAttribute("data-name");
        const platforms = e.target.getAttribute("data-platforms");
        const ratings = e.target.getAttribute("data-rating");
        const genres = e.target.getAttribute("genres");
        
        
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
                genres={props.genres} onClick={handleClick}>Save</button>
            </div>
        </div>
    );
  }
  
  export default GenerateCard;