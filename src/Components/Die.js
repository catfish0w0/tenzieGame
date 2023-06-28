import React from "react";
import "./Die.css";

export default function Die(props) {

    return (
        <div className="die" style={{backgroundColor : props.isHold ? "#59E391" : "#FFFFFF"}} onClick={props.holdHandler}>
            <h3>{props.number}</h3>
        </div>
    )
}
