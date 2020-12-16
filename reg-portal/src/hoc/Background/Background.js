import "./Background.css";
import adglogo from "../../assets/img/adglogo.png";
import adglogo2 from "../../assets/img/adglogo2.png";
import oval from "../../assets/img/oval.png";
import pic from "../../assets/img/pic.png";
import userpic from "../../assets/img/userpic.png";
import React, { Component } from "react";
import axios from "axios";

export class Background extends Component {
  state = {
    Token: localStorage.getItem("Token"),
    data: false,
  };
  constructor(props) {
    super(props);
    this.background = null;
  }
  componentDidMount() {
    let t = this;
    if (this.state.Token) {
      var config = {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      };
      axios
        .get("https://adgrecruitments.herokuapp.com/user/getuser", config)
        .then(function (response) {
          console.log(response.data);
          t.setState({ data: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    let background;
    // let profile = null;

    if (this.state.Token) {
      background = (
        <div>
          <div id='adglogo-cont2'>
            <img id='adglogo2' src={adglogo2} alt='ADG Logo' />
            <div className='flex'></div>
            {this.state.data ? (
              <div className='usr-det'>
                <span id='sp'>
                  Logged in as</span><br/>
                  {this.state.data.userDetails.name}</div>
            ) : null}
            <div>
              {/*<img id='oval' src={oval} alt='oval'/>*/}
            {/*<div>*/}
              <img id='userpic' src={userpic} alt='User pic'/>
            </div>
            {/*</div>*/}
          </div>
          <div className='container'>
            <div id='cont-box'>{this.props.children}</div>
          </div>
        </div>
      );
    } else {
      background = (
        <div>
          <div className='container'>
            <div id='adglogo-cont'>
              <img id='adglogo' src={adglogo} alt='ADG Logo' />
            </div>
            <div id='cont-box'>{this.props.children}</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div id='back-img' />
        {background}
      </div>
    );
  }
}

export default Background;
