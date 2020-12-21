import React from "react";
// import { useState } from "react";
import "./Quiz.css";
import { Redirect } from "react-router-dom";

let timeDisplay;
const Timer = (props)=>{
        // const[timerColor, setTimerColor] = useState("dodgerblue");
        let minutes=Math.floor(props.time/60);
        let seconds=Math.floor(props.time%60);
        if (seconds<10)
            timeDisplay=`${minutes} : 0${seconds} mins remaining`;
        else
            timeDisplay=`${minutes} : ${seconds} mins remaining`;
        let width=250-((props.time/600)*250);
        // console.log(width);
        if(minutes===0 && seconds<=30) {
            return(
                <div className="progress">
                    <div className="progress-done-red" style={{width}}></div>
                    {timeDisplay}
                </div>
            )
        }
        if(minutes===0 && seconds===0){
            return(
            <Redirect to="/thank-you" />
            )}
            return(
            <div className="progress">
                <div className="progress-done" style={{width}}></div>
                {timeDisplay}
            </div>
            )
}
export default Timer;
