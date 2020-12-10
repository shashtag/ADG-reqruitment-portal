import React from "react";
import "./Quiz.css";

let timeDisplay;
const Timer = (props)=>{
        let minutes=Math.floor(props.time/60);
        let seconds=Math.floor(props.time%60);
        if (seconds<10)
            timeDisplay=`${minutes} : 0${seconds} mins remaining`;
        else
            timeDisplay=`${minutes} : ${seconds} mins remaining`;
        let width=250-((props.time/600)*250);
        // console.log(width);
    return(
        <div className="progress">
            <div className="progress-done" style={{width}}>
            </div>
            {timeDisplay}
        </div>
    )
}
export default Timer;