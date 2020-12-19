import "./Background.css";
import adglogo from "../../assets/img/adglogo.png";
import adglogo2 from "../../assets/img/adglogo2.png";
import userpic from "../../assets/img/userpic.png";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Footer from "../../components/Footer/Footer";

export class Background extends Component {
  state = {
    Token: sessionStorage.getItem("Token"),
    data: false,
    recruitmentStatus: null,
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
          "auth-token": sessionStorage.getItem("Token"),
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
    // axios
    //   .get("http://adgrecruitments.herokuapp.com/user/recruitmentstatus")
    //   .then((recruitmentStatus) =>
    //     this.setState({ recruitmentStatus: recruitmentStatus.data.status })
    //   );
  }

  handleLogOut() {
    sessionStorage.removeItem("Token");
  }

  render() {
    let background;
    // let profile = null;

    if (this.state.Token) {
      background = (
        <div>
          <div id="adglogo-cont2">
            <img id="adglogo2" src={adglogo2} alt="ADG Logo" />
            <div className="flex"></div>
            {this.state.data /*&& this.state.recruitmentStatus*/ ? (
              <div id="profile-container" className="pf-cr">
                <div id="profile-wrapper" className="pf-wr">
                  <div className="uinf">
                    <div>
                      <img id="userpic" src={userpic} alt="User pic" />
                    </div>
                    <div id="profile-title" className="usr-det">
                      {this.state.data.userDetails.name}
                    </div>
                  </div>
                  <Link to="/">
                    <button id="logout-button" onClick={this.handleLogOut}>Logout</button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div className="container">
            <div id="cont-box">
              {/*{this.state.recruitmentStatus ? (*/}
              {this.props.children}
              {/*) : (*/}
              {/*  <h2 align="center">Recruitments coming soon</h2>*/}
              {/*)}*/}
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      );
    } else {
      background = (
        <div>
          <div className="container">
            <div id="adglogo-cont">
              <img id="adglogo" src={adglogo} alt="ADG Logo" />
            </div>
            <div id="cont-box">
              {/*{this.state.recruitmentStatus ? (*/}
              {this.props.children}
              {/*) : (*/}
              {/*  <h2 align="center">Recruitments coming soon</h2>*/}
              {/*)}*/}
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div id="back-img" />
        {background}
      </div>
    );
  }
}

export default Background;
