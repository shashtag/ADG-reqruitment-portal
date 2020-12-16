import Background from "../../../../hoc/Background/Background";
import React, { Component } from "react";
import axios from "axios";

export class Login extends Component {
  state = {
    regno: "",
    password: "",
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
    const data = JSON.stringify({
      regno: this.state.regno,
      password: this.state.password,
    });
    console.log(data);
    var config = {
      method: "post",
      url: "https://adgrecruitments.herokuapp.com/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("Token", response.data.Token);
        console.log(response.data);
        a.history.push("/selection");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // componentDidMount() {
  //   if (localStorage.getItem("Token")) {
  //     this.props.history.replace("/selection");
  //   }
  // }
  render() {
    return (
      <Background>
        <div className='heading'>Log In</div>
        <div className='input-grp'>
          <label id='p2'>Registration Number</label>
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
          <label id='p1'>Password</label>
          <input
            className='input'
            type='password'
            placeholder='Enter your password'
            style={{ marginBottom: 10 }}
            onChange={(event) => {
              this.inputChangeHandler(event, "password");
            }}
          />
        </div>
        <div
          className='btn btn-blue lgn-btn'
          onClick={(event) => {
            this.formSubmitHandler(event, this.props);
          }}>
          Submit
        </div>
      </Background>
    );
  }
}

export default Login;
