import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/API";
// import { Carousel } from "react-responsive-carousel";
import "./carousel.css";
// import 'react-responsive-carousel/lib/styles/carousel.min.css'



 function ImgCarousel(props) {
  // const images = props.image.
  return (
    <div className="carousel-wrapper">
      <div className="carousel-btn left-btn"/>
      <div className="carousel-btn right-btn"/>
      <div className="carousel">
          <div className="carousel-item">
            <img alt="game image" src={props.image} key={props.imgName} />
            <p> Image</p> 
          </div>
      </div>
    </div>
  );
}

export default ImgCarousel;
