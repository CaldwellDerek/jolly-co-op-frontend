import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import ImgCarousel from "./ImgCarousel";
import GroupCards from "./GroupCards.js";
// import  ImgCarousel  from "./ImgCarousel.js"

function Home(props) {
  const params = useParams();
  console.log(params);
  const [user, setUser] = useState({});
  const fetchUser = () => {
    API.getUserData(params.id, props.token).then((data) => {
      setUser(data);
    });
  };
  useEffect(() => {
    fetchUser();
  }, [params]);

  const [groups, setGroups] = useState([]);
  const fetchGroups = () => {
    API.getAllGroups().then((data) => {
      setGroups(data);
    });
  };
  useEffect(() => {
    fetchGroups();
    fetchGames();
  }, []);

  const [games, setGames] = useState([]);
  const fetchGames = () => {
    API.getAllGames().then((data) => {
      setGames(data);
    });
  };

  console.log(user);

  return (
    <div>
      <div className="page-container">
        <div className="welcomePage">
          {user ? (
            <h1 className="welcomePageh1">{user.username}'s top groups:</h1>
            ): <h3>Loading...</h3>}
        </div>
        <div className="home-group-container">
          {/* <h2 className="text-center top-groups">Your top groups</h2> */}
          <div className="card-container">
            {user.Groups ? (
              <GroupCards user={user} />
            ) : (
              <h4 >Login to see your groups</h4>
            )}
          </div>
        </div>
      </div>
      <div className="titleBack">
        <h3 className="popularGames">Popular games at Jolly-Co op</h3>
        <div className="carousel-box">
          <ImgCarousel games={games} />
        </div>
      </div>
  
    </div>
  );
}

export default Home;
