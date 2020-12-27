import React from "react";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";
import classes from "./styles.module.css";


const Instructions = (props) => {
  if (!sessionStorage.getItem("Token")) {
    props.history.replace("/");
  }
  if (!props.location.param) {
    props.history.replace("/selection");
  }
  const linkTo = {
    pathname: props.location.param,
  };
  return (
    <Background>
      <div className='heading'>{props.location.param==='Technical2' ?  "Technical" : props.location.param} Quiz</div>
      <div className='sub-heading'>
        Please read the instructions carefully before attempting the quiz
      </div>
      <div className='heading2'>Instructions</div>
      <ul style={{ textAlign: "left" }}>
        <li className={classes.li}>The participant can attempt the quiz only ONCE.</li>
          {props.location.param === "Technical2" ? (null) : (
              <li className={classes.li}>
                  {props.location.param === "Technical"
                      ? "The quiz will have 10 multiple choice questions."
                          : props.location.param === "Management"
                              ? "The quiz will have 5 Long Answer type questions."
                              : "The quiz will have 10 multiple choice questions."}
              </li>
          )}
          {props.location.param === "Technical2" ? (null) : (
                <li className={classes.li}>
                  {props.location.param === "Technical"
                    ? "10 minutes will be provided to complete the quiz."
                    : props.location.param === "Management"
                    ? "There is no time limit for completing the quiz."
                    : "10 minutes will be provided to complete the quiz."}
                </li>
              )}
          {props.location.param === "Technical2" ? (
              <li className={classes.li}>
                  In case the participant tries to close the web portal or go back from the
                  quiz, the quiz will be auto submitted.
              </li>
          ) : (
                <li className={classes.li}>
                  In case the participant tries to close the web portal or go back from the
                  quiz, it shall be considered a case of malpractice and the quiz will be auto
                  submitted.
                </li>
              )}
      </ul>
      <Link  to={linkTo} className='btn btn-blue lgn-btn'>
        Begin
      </Link>
    </Background>
  );
};
export default Instructions;
