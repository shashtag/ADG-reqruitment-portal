import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Background from "../../../hoc/Background/Background";

const ThankYou = ()=>{
    return(
        <Background>
            <div>Your responses have been saved!</div>
            <p>You can attempt quiz from other domains if you haven't</p>
            <Link to="/selection"><button className={classes.redirectBtn}>Attempt other quizzes</button></Link>
        </Background>
    )
}
export default ThankYou;