import React, { Component } from "react";
import Background from "../../../hoc/Background/Background";
import axios from "axios";

export class SignUp extends Component {
  state = {
    firstPage: true,
    name: "",
    regno: "",
    email: "",
    phone: "",
    yearofstudy: 1,
    password: "",
    confirmPass: "",
    github: "",
    nameError: "",
    regError: "",
    emailError: "",
    passError: "",
    confirmPassError: "",
    phoneError: "",
    gitError: "",
  };

  validate = () => {
    let nameError = "";
    let regError = "";
    let passError = "";
    let confirmPassError = "";

    if (!this.state.name) {
      nameError = "Name field cannot be left empty";
    }

    if (!this.state.regno) {
      regError = "Registration number cannot be left empty";
    }

    if (!this.state.password) {
      passError = "Enter Password";
    } else if (this.state.password.length < 8) {
      passError = "Password length must be greater than 8 characters";
    }

    if (this.state.password && !this.state.confirmPass) {
      confirmPassError = "Confirm Password";
    } else if (this.state.password != this.state.confirmPass) {
      confirmPassError = "Password and Confirm Password do not match";
    }

    if (nameError || regError || passError || confirmPassError) {
      this.setState({ nameError, regError, passError, confirmPassError });
      return false;
    }

    return true;
  };

  validate2 = () => {
    let emailError = "";
    let phoneError = "";
    let gitError = "";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!this.state.email) {
      emailError = "email field cannot be left empty";
    } else if (!re.test(this.state.email)) {
      emailError = "invalid email";
    }

    if (!this.state.phone) {
      phoneError = "Phone number cannot be left empty";
    }

    if (!this.state.github) {
      gitError = "Github ID cannot be left empty";
    }

    if (emailError || phoneError || gitError) {
      this.setState({ emailError, phoneError, gitError });
    }

    return true;
  };

  createAccountClickHandler = (event) => {
    event.preventDefault();
    this.validate();

    if (this.validate()) {
      this.setState({ firstPage: false });
    }
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
    this.validate2();

    const data = JSON.stringify({
      name: this.state.name,
      regno: this.state.regno,
      email: this.state.email,
      phone: this.state.phone,
      yearofstudy: "1",
      password: this.state.password,
      // github: this.state.github,
    });
    var config = {
      method: "post",
      url: "https://adgrecruitments.herokuapp.com/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        a.history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    if (sessionStorage.getItem("Token")) {
      this.props.history.replace("/selection");
    }
  }

  render() {
    return (
      <Background>
        <form autofill="off">
          {this.state.firstPage ? (
            <div>
              <div className="heading">Sign Up</div>
              <div className="input-grp">
                <label>Name</label>

                <input
                  className="input"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "name");
                  }}
                />
              </div>
              {this.state.nameError ? (
                <div className="error">{this.state.nameError}</div>
              ) : null}
              <div className="input-grp">
                <label>Registration Number</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Registration number"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "regno");
                  }}
                />
              </div>
              {this.state.regError ? (
                <div className="error">{this.state.regError}</div>
              ) : null}
              <div className="input-grp">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "password");
                  }}
                />
              </div>
              {this.state.passError ? (
                <div className="error">{this.state.passError}</div>
              ) : null}
              <div className="input-grp">
                <label>Confirm password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "confirmPass");
                  }}
                />
              </div>
              {this.state.confirmPassError ? (
                <div className="error">{this.state.confirmPassError}</div>
              ) : null}
              <div className="sub-btn" onClick={this.createAccountClickHandler}>
                Create account
              </div>
            </div>
          ) : (
            <div>
              <div className="heading">Sign Up</div>
              <div className="input-grp">
                <label>Phone</label>
                <input
                  className="input"
                  type="tel"
                  placeholder="Enter your phone no."
                  onChange={(event) => {
                    this.inputChangeHandler(event, "phone");
                  }}
                />
              </div>
              {this.state.phoneError ? (
                <div className="error">{this.state.phoneError}</div>
              ) : null}
              <div className="input-grp">
                <label>VIT-Email</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your VIT Email"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "email");
                  }}
                />
              </div>
              {this.state.emailError ? (
                <div className="error">{this.state.emailError}</div>
              ) : null}
              <div className="input-grp">
                <label>Github</label>
                <input
                  className="input"
                  type="text"
                  value={this.state.github}
                  placeholder="Enter your github handle"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "github");
                  }}
                />
              </div>
              {this.state.gitError ? (
                <div className="error">{this.state.gitError}</div>
              ) : null}
              <div
                className="sub-btn"
                onClick={(event) => {
                  this.formSubmitHandler(event, this.props);
                }}>
                Sign Up
              </div>
            </div>
          )}
        </form>
      </Background>
    );
  }
}

export default SignUp;
