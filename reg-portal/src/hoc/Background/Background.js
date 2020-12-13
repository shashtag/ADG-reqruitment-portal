import "./Background.css";
import adglogo from "../../assets/img/adglogo.png";
import adglogo2 from "../../assets/img/adglogo2.png";
import React, { Component } from "react";

export class Background extends Component {
  state = {
    Token: localStorage.getItem("Token"),
  };

  render() {
    let background;
    if (this.state.Token) {
      background = (
        <div>
          <div id='back-img' />
          <div id='adglogo-cont2'>
            <img id='adglogo2' src={adglogo2} alt='ADG Logo' />
            <div className='flex'></div>
            <div>swdds</div>
          </div>
          <div className='container'>
            <div id='cont-box'>{this.props.children}</div>
          </div>
        </div>
      );
    } else {
      background = (
        <div>
          <div id='back-img' />
          <div className='container'>
            <div id='adglogo-cont'>
              <img id='adglogo' src={adglogo} alt='ADG Logo' />
            </div>
            <div id='cont-box'>{this.props.children}</div>
          </div>
        </div>
      );
    }
    return background;
  }
}

export default Background;
