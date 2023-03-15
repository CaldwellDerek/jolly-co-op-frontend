import React, {useEffect, useState} from "react"
import "./style.css"
import API from "../../../utils/API"
import  ImgCarousel  from "../Home/ImgCarousel.js"


const styleCard = {
    width: "70%",
    margin:"auto",
    borderWidth: "5px",
    borderStyle: "double",
    borderColor: "#26c6da"
}

function HomeLogout(){
    const [games, setGames] = useState([]);
const fetchGames = () => {
    API.getAllGames().then((data) => {
        setGames(data)
    })
}

useEffect(() => {
    fetchGames();
}, []);



    return (
        <div>
<div className="welcomeLPage">
<div className="page-container">

    <h1 className="welcomeLPageh1" >Welcome Stranger,</h1>
    <div className="card-container ">
</div>
        <div>
            
        <div className="card logoutStyle ">
    <h2 id="loggedout-text">Login to create a group and start voting!</h2>
        </div>
    </div>
</div>
    <div className="gameDiv">

<h3 className="popularGames">Popular games at Jolly-Co op</h3>
        <div className="carousel-box"> 
  <ImgCarousel games={games}/>
</div>
</div>
    </div>
    </div>
    )
}

export default HomeLogout;