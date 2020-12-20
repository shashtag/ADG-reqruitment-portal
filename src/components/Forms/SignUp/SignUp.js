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
    err: "",
    showPass: false,
    showCPass: false,
  };

  validate = () => {
    let nameError = "";
    let regError = "";
    let passError = "";
    let confirmPassError = "";
    var regPattern = /^[12][09][A-Z][A-Z][A-Z]\d{4}$/;
    var regPatternSoph = /^[1][9][A-Z][A-Z][A-Z]\d{4}$/;

    if (!this.state.name) {
      nameError = "Name field cannot be left empty";
    }

    if (!this.state.regno) {
      regError = "Registration number cannot be left empty";
    } else if (!regPattern.test(this.state.regno)) {
      regError = "Enter Valid Registration number";
    }

    if (regPatternSoph.test(this.state.regno)) {
      this.state.yearofstudy = 2;
    }

    if (!this.state.password) {
      passError = "Enter Password";
    } else if (this.state.password.length < 8) {
      passError = "Password length must be greater than 8 characters";
    }

    if (this.state.password && !this.state.confirmPass) {
      confirmPassError = "Confirm Password";
    } else if (this.state.password !== this.state.confirmPass) {
      confirmPassError = "Passwords do not match";
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
    var re = /^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@vitstudent.ac.in$/;

    if (!this.state.email) {
      emailError = "Email field cannot be left empty";
    } else if (!re.test(this.state.email)) {
      emailError = "invalid Email";
    }

    if (!this.state.phone) {
      phoneError = "Phone number cannot be left empty";
    }

    if (this.state.yearofstudy === 2) {
      gitError = "GitHub ID is mandatory for 2nd year students";
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

    console.log(this.state.yearofstudy);

    const data = JSON.stringify({
      name: this.state.name,
      regno: this.state.regno,
      email: this.state.email,
      phone: this.state.phone,
      yearofstudy: this.state.yearofstudy,
      password: this.state.password,
      githubLink: this.state.github,
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
        alert(error.response.data.message);
        console.log(error.success);
      });
  };
  componentDidMount() {
    if (sessionStorage.getItem("Token")) {
      this.props.history.replace("/selection");
    }
  }
  eyeClickHandler = () => {
    this.setState({ showPass: !this.state.showPass });
  };
  eyeClickHandlerC = () => {
    this.setState({ showCPass: !this.state.showCPass });
  };

  render() {
    return (
      <Background>
        <form autoComplete='false'>
          {this.state.firstPage ? (
            <div>
              <div className='heading'>Sign Up</div>
              <div className='input-grp'>
                <label>Name</label>

                <input
                  className='input name-input'
                  type='text'
                  value={this.state.name}
                  placeholder='Enter your name'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "name");
                  }}
                />
              </div>
              {this.state.nameError ? (
                <div className='error'>{this.state.nameError}</div>
              ) : null}
              <div className='input-grp'>
                <label>Registration Number</label>
                <input
                  autoComplete='off'
                  onFocus={this.onFocus}
                  className='input .t-uc'
                  value={this.state.regno}
                  type='text'
                  placeholder='Enter Registration Number'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "regno");
                  }}
                />
              </div>
              {this.state.regError ? (
                <div className='error'>{this.state.regError}</div>
              ) : null}
              <div className='input-grp'>
                <label>Password</label>
                <input
                  className='input'
                  type={`${this.state.showPass ? "text" : "password"}`}
                  style={{ marginBottom: 10, position: "relative" }}
                  value={this.state.password}
                  placeholder='Enter Your Password'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "password");
                  }}
                />
                <div
                  className={`sgn-eye ${
                    this.state.showPass ? "sgn-eye-t" : null
                  }`}
                  onClick={this.eyeClickHandler}>
                  <i className={`fas fa-eye  `}></i>
                </div>
              </div>
              {this.state.passError ? (
                <div className='error'>{this.state.passError}</div>
              ) : null}
              <div className='input-grp'>
                <label>Confirm Password</label>
                <input
                  className='input'
                  type={`${this.state.showCPass ? "text" : "password"}`}
                  style={{ marginBottom: 10, position: "relative" }}
                  value={this.state.confirmPass}
                  placeholder='Confirm Password'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "confirmPass");
                  }}
                />
                <div
                  className={`lgnc-eye ${
                    this.state.showCPass ? "lgnc-eye-t" : null
                  }`}
                  onClick={this.eyeClickHandlerC}>
                  <i className={`fas fa-eye  `}></i>
                </div>
              </div>
              {this.state.confirmPassError ? (
                <div className='error'>{this.state.confirmPassError}</div>
              ) : null}
              <div className='sub-btn' onClick={this.createAccountClickHandler}>
                Next
              </div>
            </div>
          ) : (
            <div>
              <div className='heading'>Sign Up</div>
              <div className='input-grp'>
                <label>Phone Number</label>
                <input
                  className='input'
                  type='text'
                  value={this.state.phone}
                  placeholder='Enter Your Phone Number'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "phone");
                  }}
                />
              </div>
              {this.state.phoneError ? (
                <div className='error'>{this.state.phoneError}</div>
              ) : null}
              <div className='input-grp'>
                <label>VIT Email</label>
                <input
                  className='input'
                  type='text'
                  value={this.state.email}
                  placeholder='Enter Your VIT Email'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "email");
                  }}
                />
              </div>
              {this.state.emailError ? (
                <div className='error'>{this.state.emailError}</div>
              ) : null}
              <div className='input-grp'>
                <label>GitHub Link</label>
                <input
                  className='input'
                  type='text'
                  value={this.state.github}
                  placeholder='Enter Your GitHub Handle'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "github");
                  }}
                />
              </div>
              {this.state.gitError ? (
                <div className='error'>{this.state.gitError}</div>
              ) : null}
              <div
                className='sub-btn'
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
