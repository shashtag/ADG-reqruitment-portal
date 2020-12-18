import React from "react";
import { Link } from "react-router-dom";
import "./Instruction.css";
import Background from "../../hoc/Background/Background";

const Instructions = (props) => {

  const quizLink = {
    pathname: props.location.param
  }
  return (
    <Background>
      <div className="inst">
        <h1>{props.location.param} Quiz</h1>
        <p id="inst1">
          Please read the Instructions carefully before starting the Quiz
        </p>
        <p id="inst2">Instructions</p>
        <ul>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
        </ul>
        <Link to={quizLink}>
          <button className="begin">
            <p>Begin</p>
          </button>
        </Link>
      </div>
    </Background>
  );
};

export default Instructions;
