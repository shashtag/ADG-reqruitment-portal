import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Background from "../../../hoc/Background/Background";

const DomainPage = (props) => {
  const [checkVal, setCheckVal] = useState("technical");
  function getSelectedVal(event) {
    setCheckVal(event.target.value);
  }
  const linkTo = {
    pathname: "/instructions",
    param: checkVal,
  };
  return (
    <Background>
      <h1>Choose Domain</h1>
      <p>Choose a domain to start the quiz</p>
      <div className={classes.container} onChange={getSelectedVal}>
        <div className={classes.inputBox}>
          <input
            type='radio'
            value='Technical'
            name='selection'
            id='technical'
            className={classes.input}></input>
          <label htmlFor='technical' className={classes.label}>
            Technical
          </label>
        </div>
        <div className={classes.inputBox}>
          <input
            type='radio'
            value='Design'
            name='selection'
            id='design'
            className={classes.input}></input>
          <label htmlFor='design' className={classes.label}>
            Design
          </label>
        </div>
        <div className={classes.inputBox}>
          <input
            type='radio'
            value='Management'
            name='selection'
            id='management'
            className={classes.input}></input>
          <label htmlFor='management' className={classes.label}>
            Management
          </label>
        </div>
        <Link to={linkTo} className={classes.button}>
          Start Quiz
        </Link>
      </div>
    </Background>
  );
};
export default DomainPage;
