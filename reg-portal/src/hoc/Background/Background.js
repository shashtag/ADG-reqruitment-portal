import React from "react";
import Aux from "../aux/aux";
import "./Background.css";

const Background = (props) => {
  return (
    <Aux>
      <div id='back-img' />
      <div className=''>{props.children}</div>
    </Aux>
  );
};

export default Background;
