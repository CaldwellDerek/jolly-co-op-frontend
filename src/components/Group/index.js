import React from "react";
import "./style.css"

const JollyGroup = (props) => {
    return (
        <div className="Group">
            <h2>{props.name}</h2>
            <h3>Owner:{props.owner}</h3>
            <h3>Members:{props.members}</h3>
            <h3>Games:{props.games}</h3>
        </div>
    )
}