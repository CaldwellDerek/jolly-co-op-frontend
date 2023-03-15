import React, { useState } from "react";
import "./carousel.css";
import Carousel from 'react-bootstrap/Carousel'


const styleCard = {
  height: "20rem",
}
const styleCard2 = {
  border: "5px groove #f48fb1",
  margin: "10px",
  borderRadius: "10px",
  maxWidth:"80%",
  display:"flex",
  justifyContent: "center"
}
  const styleCard3 = {
    maxWidth: '100%',
  }
             

 function ImgCarousel(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    

    setIndex(selectedIndex)
  }
  return (

  //-----------bootstrap carousel-------------
  <Carousel slide={false} activeIndex={index} onSelect={handleSelect} style={styleCard2}  >


  {props.games.map((game, index)=>{
   
    return (
      <Carousel.Item style={styleCard3} className="  mx-auto">


      <img className=" w-100 rounded carouselImg" style={styleCard}src={game.imgURL} key={index} alt="Game Gallery"/>
      <Carousel.Caption bg-dark mb-4 className="carousel-caption" >
      <p className="captionName" key={index}>{game.name}</p>
    </Carousel.Caption>
      </Carousel.Item >
  )})}

  
  </Carousel>
  );
}

export default ImgCarousel;
