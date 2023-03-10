import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/API";
// import { Carousel } from "react-responsive-carousel";
import "./carousel.css";
// import 'react-responsive-carousel/lib/styles/carousel.min.css'



 function ImgCarousel(props) {
  
  return (
    <div className="carousel-wrapper">
      <div className="carousel-btn left-btn"/>
      <div className="carousel-btn right-btn"/>
      <div className="carousel">
            {props.games.map((game, index)=>{
              return (
                <div className="carousel-item">
              <img className="carousel-item-img" alt="game image" src={game.imgURL} key={index} />
              <p className="carousel-item-p">{game.name} </p> 
              </div>
            )})}
          </div>
      </div>
  );
}

export default ImgCarousel;
