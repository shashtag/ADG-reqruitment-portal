import React from "react";
import Aux from "../aux/aux";
import "./Background.css";
import adglogo from "../../assets/img/adglogo.png";

const Background = (props) => {
  return (
    <Aux>
      <div id='back-img' />
      <div className='container'>
        <div id='adglogo-cont'>
          <img id='adglogo' src={adglogo} alt='ADG Logo' />
        </div>
        <div id='cont-box'>{props.children}</div>
      </div>
    </Aux>
  );
};

export default Background;
