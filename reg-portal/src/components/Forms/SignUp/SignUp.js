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
    github: "",
  };
  createAccountClickHandler = () => {
    this.setState({ firstPage: false });
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
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

  render() {
    return (
      <Background>
        <form>
          {this.state.firstPage ? (
            <div>
              <div className='heading'>Sign Up</div>
              <div className='input-grp'>
                <label>Name</label>

                <input
                  className='input'
                  type='text'
                  placeholder='Enter your name'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "name");
                  }}
                />
              </div>
              <div className='input-grp'>
                <label>Registration Number</label>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter Registration number'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "regno");
                  }}
                />
              </div>
              <div className='input-grp'>
                <label>Password</label>
                <input
                  className='input'
                  type='password'
                  placeholder='Enter your password'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "password");
                  }}
                />
              </div>
              <div className='input-grp'>
                <label>Confirm password</label>
                <input
                  className='input'
                  type='password'
                  placeholder='Confirm password'
                />
              </div>
              <div className='sub-btn' onClick={this.createAccountClickHandler}>
                Create account
              </div>
            </div>
          ) : (
            <div>
              <div className='heading'>Sign Up</div>
              <div className='input-grp'>
                <label>Phone</label>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter your phone no.'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "phone");
                  }}
                />
              </div>
              <div className='input-grp'>
                <label>VIT-Email</label>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter your VIT Email'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "email");
                  }}
                />
              </div>
              <div className='input-grp'>
                <label>Github</label>
                <input
                  className='input'
                  type='text'
                  placeholder='Enter your github handle'
                  onChange={(event) => {
                    this.inputChangeHandler(event, "github");
                  }}
                />
              </div>
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
