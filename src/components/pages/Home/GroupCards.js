import React, {useState} from "react"
import { Link } from "react-router-dom";
import API from "../../../utils/API"

const GroupCards = (props) => {

    return (
        <div>
            <h3>Group {props.name} </h3>
            <h4>is playing {props.game}</h4>
        </div>
    )
}

export default GroupCards;