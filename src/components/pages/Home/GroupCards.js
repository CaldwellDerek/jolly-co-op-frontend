import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"

const GroupCards = (props) => {

    return (
        <div className="card">
            <div className="card-body d-flex flex-column justify-content-between align-items-center">

            <h3 className="card-title">Group {props.name} </h3>
            <h4 className="card-text">is playing {props.game}</h4>
            <h4 className="card-text">{props.user}</h4>
            </div>
        </div>
    )
}

export default GroupCards;