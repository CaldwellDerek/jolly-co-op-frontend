import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/API";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function GenerateImgCarousel(props) {

  return (
    <div className="carousel-wrapper">

    <Carousel infiniteLoop useKeyboardArrows autoPlay>
<div>
<img src="https://placehold.co/100x100" />
<p className="legend">Legend 1</p>
</div>
<div>
<img src="https://placehold.co/200x200" />
<p className="legend">Legend 2</p>
</div>
<div>
<img src="https://placehold.co/300x300" />
<p className="legend">Legend 3</p>
</div>
</Carousel>
    </div>
  )
}

export default GenerateImgCarousel;
