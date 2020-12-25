import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Background from "../../../hoc/Background/Background";

const ThankYou = () => {
  return (
    <Background>
      <div className={classes.wrapper}>
        <h2>Your responses have been saved!</h2>
        <div className="sub-heading">
          You can attempt quiz from other domains if you haven't
        </div>
        <Link to="/selection">
          <button className={classes.redirectBtn}>Attempt another quiz</button>
        </Link>
      </div>
    </Background>
  );
};
export default ThankYou;
