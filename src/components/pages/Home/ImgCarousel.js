import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/API";
// import { Carousel } from "react-responsive-carousel";
import "./carousel.css";
// import 'react-responsive-carousel/lib/styles/carousel.min.css'

const images = [
  
  "https://placehold.co/300x300",
  "https://placehold.co/300x300",
  "https://placehold.co/300x300",
];

 function ImgCarousel() {
  return (
    <div className="carousel-wrapper">
      <div className="carousel-btn left-btn"/>
      <div className="carousel-btn right-btn"/>
      <div className="carousel">
        {images.map((URL, index) => (
          <div className="carousel-item">
            <img alt="game image" src={URL} key={index} />
            <p> Image</p> 
          </div>
      ))}
      </div>
    </div>
  );
}

export default ImgCarousel;
