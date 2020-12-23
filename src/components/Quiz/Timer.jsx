import React ,{useEffect } from "react";
import { useState } from "react";
import "./Quiz.css";
import { Redirect } from "react-router-dom";

const Timer = ()=>{
    const [time,setTime]=useState(600);
    const [minutes,setMinutes]=useState(10);
    const [seconds,setSeconds]=useState(0);
    const [timerColor,setTimerColor]=useState("progress-done")
            function getTimer() {
            if (time > 0) {
                setTimeout(() => {
                    setTime(time-1);
                    setMinutes(Math.floor(time/60));
                    setSeconds(Math.floor(time%60));
                    if(time<30){
                        setTimerColor("progress-done-red");
                    }
                }, 1000);
            }
        }
        useEffect(()=>{
            getTimer();
            return <Redirect to="/thank-you" />
        })
        let width=250-((time/600)*250);
    return(
            <div className="progress">
                <div className={timerColor} style={{width}}></div>
                {seconds >=10 ? `${minutes}:${seconds} mins remaining`  : `${minutes}:0${seconds} mins remaining`  }
            </div>
    )
}

export default Timer;
