import React, { Component } from "react";
import Background from "../../../../hoc/Background/Background";
import axios from "axios";
import Recaptcha from "react-google-invisible-recaptcha";

export class ForgotPassword extends Component {
  state = {
    firstPage: true,
    email: "",
    emailError: "",
    otp: "",
    otpError: "",
    newPassword: "",

    confirmPass: "",
    newPasswordErr: "",
    confirmPassErr: "",

    newPasswordErr: "",
    confirmPassword: "",
    confirmPasswordErr: "",
  };

  validate = () => {
    let emailError = "";
    var re = /^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@vitstudent.ac.in$/;
    if (!this.state.email) {
      emailError = "Enter Email ID";
    } else if (!re.test(this.state.email)) {
      emailError = "Enter a valid VIT Email ID";
    }

    if (emailError) {
      this.setState({ emailError});
      return false;
    }

    return true;
  };

  forgotPasswordClickHandler = (event) => {
    this.validate();
    if(this.validate()) {
      
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
            console.log(response.data);
            this.setState({ firstPage: false });
          })
          .catch((error) => {
            console.log(error.response.data);
            this.setState({ emailError: error.response.data.message });
          });
    }
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };

  validate2 = () => {
    let otpError= "";
    let newPasswordErr = "";
    let confirmPassErr = "";

    if (!this.state.otp) {
      otpError = "Enter OTP";
    }
    else if (this.state.otp.length!=6) {
      otpError = "Enter valid OTP";
    }

    if (!this.state.newPassword) {
      newPasswordErr = "Enter new Password";
    } else if (this.state.newPassword.length < 8) {
      newPasswordErr = "Password length must be greater than 8 characters";
    }

    if (this.state.newPassword && !this.state.confirmPass) {
      confirmPassErr = "Confirm Password";
    } else if (this.state.newPassword && this.state.newPassword !== this.state.confirmPass) {
      confirmPassErr = "The entered passwords do not match";
    }


    if (newPasswordErr || confirmPassErr || otpError) {
      this.setState({newPasswordErr, confirmPassErr, otpError });
      return false;
    }

    return true;
  };

  formSubmitHandler = (e, a) => {
    this.validate2();
    e.preventDefault();
    if(this.validate2()) {
      if (this.state.newPassword.length < 8) {
        this.recaptcha.reset();
        return;
      }
      if (this.state.newPassword !== this.state.confirmPass) {
              this.setState({ confirmPasswordErr: "Passwords must match" });

        this.recaptcha.reset();
        return;
      }
      else{
              this.recaptcha.execute();

      }
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
                {this.state.emailError ? (
                    <div className='error'>{this.state.emailError}</div>
                ) : null}
              </div>
              <div
                className="sub-btn"
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
                  type='number'
                  placeholder="Enter OTP"
                  value={this.state.otp}
                  onChange={(event) => {
                    this.inputChangeHandler(event, "otp");
                  }}
                />
                {this.state.messageErr !== "" && (
                    <div className="error">{this.state.emailErr}</div>
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
                  value={this.state.confirmPass}
                  onChange={(event) => {
                    this.inputChangeHandler(event, "confirmPass");
                  }}
                />
                {this.state.confirmPassErr !== "" && (
                  <div className="error">{this.state.confirmPassErr}</div>
                )}

              </div>
            ) : (
              <div>
                <div className="heading">Change Password</div>
                <div className="input-grp">
                  <label>OTP</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter OTP"
                    value={this.state.otp}
                    onChange={(event) => {
                      this.inputChangeHandler(event, "otp");
                    }}
                  />
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
                  className="sub-btn"
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
