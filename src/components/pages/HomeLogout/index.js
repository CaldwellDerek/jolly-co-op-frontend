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





    return (
        <div>

    <h1>Welcome Stranger,</h1>
    <div className="card"style={styleCard}>
    <h2>Login to create a group and start voting!</h2>
    </div>
        <div className="carousel-box"> 
<h3 className="popularGames">Polular games at Jolly-Co op</h3>
  <ImgCarousel games={games}/>
</div>
</div>
    
    )
}

export default HomeLogout;