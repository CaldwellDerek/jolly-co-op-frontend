import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API"
import { Link } from "react-router-dom";
import Gamecard from "../../Gamecard/Gamecard"

const Allgamesingroup=(props)=>{
    const params = useParams();
    console.log(params);
    const [user, setUser] = useState({});
    const [isMyPage, setIsMyPage] = useState(false);
    const fetchUser = () => {
      API.getUserData(params.id).then((data) => {
        setUser(data);
        console.log(props.userId);
        if (props.userId == params.id) {
          setIsMyPage(true);
        } else {
          setIsMyPage(false);
        }
      });
    };
    useEffect(() => {
      fetchUser();
    }, [props.userId,params.id]);


    return(
      <Gamecard/>
    )
}

export default Allgamesingroup