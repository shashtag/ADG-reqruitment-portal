import React, { Component } from "react";
import Background from "../../../../hoc/Background/Background";
import axios from "axios";
import Recaptcha from "react-google-invisible-recaptcha";

export class ForgotPassword extends Component {
  state = {
    firstPage: true,
    email: "",
    emailErr: "",
    otp: "",
    otpErr: "",
    newPassword: "",
    newPasswordErr: "",
    confirmPassword: "",
    confirmPasswordErr: "",
    err: "",
  };
  forgotPasswordClickHandler = (event) => {
    event.preventDefault();
    if (this.state.email === "") {
      this.setState({ emailErr: "Please enter your email id" });
      return;
    }
    const data = JSON.stringify({
      email: this.state.email,
    });
    const config = {
      method: "post",
      url: "https://adgrecruitments.herokuapp.com/user/resetpassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        // console.log(response.data);
        this.setState({ firstPage: false });
      })
      .catch((error) => {
        // console.log(error.response.data);
        this.setState({ emailErr: error.response.data.message });
      });
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
    e.preventDefault();

    this.setState({
      otpErr: "",
    });

    if (!this.state.otp) {
      this.setState({
        otpErr: "Enter valid OTP",
      });
    }

    if (this.state.newPassword.length < 8) {
      this.setState({
        newPasswordErr: "Password must be at least 8 characters",
      });
      this.recaptcha.reset();
      return;
    }
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ confirmPasswordErr: "Passwords must match" });
      this.recaptcha.reset();
      return;
    } else {
      this.recaptcha.execute();
    }
  };
  onResolved = (a) => {
    // alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
    const data = JSON.stringify({
      // email: this.state.email,
      otp: this.state.otp,
      password: this.state.newPassword,
      // confirmPassword: this.state.confirmPassword,
    });
    const config = {
      method: "PUT",
      url: "https://adgrecruitments.herokuapp.com/user/updatepassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        a.history.push("/login");
      })
      .catch(function (error) {
        // console.log(error);
        alert(error.response.data.message);
      });
  };

  render() {
    return (
      <>
        <Background>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}>
            {this.state.firstPage ? (
              <div>
                <div className="heading">Forgot Password</div>
                <div className="input-grp">
                  <label>Email</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={(event) => {
                      this.inputChangeHandler(event, "email");
                    }}
                  />
                  {this.state.messageErr !== "" && (
                    <div className="error">{this.state.emailErr}</div>
                  )}
                </div>
                <div
                  className="btn btn-blue lgn-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    this.forgotPasswordClickHandler(event);
                  }}>
                  Send OTP
                </div>
              </div>
            ) : (
              <div>
                <div className="heading">Change Password</div>
                <div className="input-grp">
                  <label>OTP</label>
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter OTP"
                    value={this.state.otp}
                    onChange={(event) => {
                      this.inputChangeHandler(event, "otp");
                    }}
                  />
                  {this.state.otpErr !== "" && (
                      <div className="error">{this.state.otpErr}</div>
                  )}
                </div>
                <div className="input-grp">
                  <label>New Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.newPassword}
                    onChange={(event) => {
                      this.inputChangeHandler(event, "newPassword");
                    }}
                  />
                  {this.state.newPasswordErr !== "" && (
                    <div className="error">{this.state.newPasswordErr}</div>
                  )}
                </div>
                <div className="input-grp">
                  <label>Confirm Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={(event) => {
                      this.inputChangeHandler(event, "confirmPassword");
                    }}
                  />
                  {this.state.confirmPasswordErr !== "" && (
                    <div className="error">{this.state.confirmPasswordErr}</div>
                  )}
                </div>
                <div
                  className="btn btn-blue lgn-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    this.formSubmitHandler(event, this.props);
                  }}>
                  Change Password
                </div>
              </div>
            )}
          </form>
        </Background>
        <Recaptcha
          ref={(ref) => (this.recaptcha = ref)}
          sitekey="6LerFBIaAAAAAPrLv6zWVFAZ7VQYGE8DfbUXyt8r
"
          onResolved={() => this.onResolved(this.props)}
          onError={() => {
            alert("Captcha Error : Please refresh site and try again");
          }}
        />
      </>
    );
  }
}

export default ForgotPassword;
