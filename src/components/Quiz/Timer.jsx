import React ,{useEffect } from "react";
import { useState } from "react";
import "./Quiz.css";
import { Redirect } from "react-router-dom";

const Timer = ()=>{
    const [time,setTime]=useState(6000);
    const [minutes,setMinutes]=useState(10);
    const [seconds,setSeconds]=useState(0);
    const [timerColor,setTimerColor]=useState("progress-done")
            function getTimer() {
            if (time >= 0) {
                setTimeout(() => {
                    setTime(time-1);
                    setMinutes(Math.floor(time/60));
                    setSeconds(Math.floor(time%60));
                    if(time<30){
                        setTimerColor("progress-done-red");
                    }
                }, 1000);
            } else {
                <Redirect to="/thank-you" />
            }
        }
        useEffect(()=>{
            getTimer();
        })
        let width=250-((time/6000)*250);
        if (time >= 0 ){
            return(
                    <div className="progress">
                        <div className={timerColor} style={{width}}></div>
                        <p className="time-p">{seconds >=10 ? `${minutes}:${seconds} mins remaining`  : `${minutes}:0${seconds} mins remaining`}</p>
                    </div>
            )}  else {
                return(
                    <Redirect to="/thank-you" />
                )
            }
}
export default Timer;
