import React from "react";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";
import classes from "./styles.module.css";

const Instructions = (props) => {
  const linkTo = {
    pathname: "/quiz",
    param: props.location.param,
  };
  return (
    <Background>
      <div className={classes.container}>
        <h1>{props.location.param} Quiz</h1>
        <p>Please read the instructions carefully before attempting the quiz</p>
        <h1>Instructions</h1>
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            recusandae doloribus deleniti quasi repellat ipsum, amet quidem in
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex
            quos illum reprehenderit quo dignissimos dolores error? Deleniti quo
            voluptas
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, itaque
            unde aliquid nulla{" "}
          </li>
        </ul>
        <Link to={linkTo} className={classes.button}>
          Begin
        </Link>
      </div>
    </Background>
  );
};
export default Instructions;
