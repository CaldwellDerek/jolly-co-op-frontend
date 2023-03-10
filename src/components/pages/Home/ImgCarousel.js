import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../../utils/API";
// import { Carousel } from "react-responsive-carousel";
// import "./carousel.css";
import Carousel from 'react-bootstrap/Carousel'

// import 'react-responsive-carousel/lib/styles/carousel.min.css'

const styleCard = {
  height: "15rem",
  margin: "10px"
}
const styleCard2 = {
  border: "5px groove #f48fb1",
  margin: "10px"
}
 
  const styleCard3 = {

  }
                 

 function ImgCarousel(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    

    setIndex(selectedIndex)
  }
  return (

    //-------carousel that is not working------------------
  //   <div className="carousel-wrapper">
  //     <div className="carousel-btn left-btn"/>
  //     <div className="carousel-btn right-btn"/>
  //     <div className="carousel">
  //           {props.games.map((game, index)=>{
  //             return (
  //               <div className="carousel-item">
  //             <img className="carousel-item-img" alt="game image" src={game.imgURL} key={index} />
  //             <p className="carousel-item-p">{game.name} </p> 
  //             </div>
  //           )})}
  //         </div>
  //     </div>
  // );

  //-----------bootstrap carousel-------------
  <Carousel activeIndex={index} onSelect={handleSelect} style={styleCard2} >

  {props.games.map((game, index)=>{
    console.log(game)
    console.log(index)
    return (
      <Carousel.Item >

      <img className="d-block w-100 rounded" style={styleCard}src={game.imgURL} alt="Game Gallery"/>
      <Carousel.Caption>
      <p>{game.name}</p>
    </Carousel.Caption>
      </Carousel.Item>
  )})}
  
  </Carousel>
  );
}

export default ImgCarousel;
