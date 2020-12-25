import Background from "../../../../hoc/Background/Background";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-invisible-recaptcha";

export class Login extends Component {
  state = {
    regno: "",
    password: "",
    regError: "",
    passError: "",
    showPass: false,
    err: "",
    value: "",
  };

  validate = () => {
    let regError = "";
    let passError = "";
    var regPattern = /^[12][09][A-Za-z][A-Za-z][A-Za-z]\d{4}$/;

    if (!this.state.regno) {
      regError = "Enter Registration Number";
    } else if (!regPattern.test(this.state.regno)) {
      regError = "Enter a valid Registration Number";
    }

    if (!this.state.password) {
      passError = "Enter Password";
    }

    if (regError || passError) {
      this.setState({ regError, passError });
      return false;
    }

    return true;
  };

  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
    this.validate();

    if (this.validate()) {
      this.recaptcha.execute();

      
    } else {
      this.recaptcha.reset();
    }
  };
  componentDidMount() {
    if (sessionStorage.getItem("Token")) {
      this.props.history.replace("/selection");
    }
  }
  eyeClickHandler = () => {
    this.setState({ showPass: !this.state.showPass });
  };
  onResolved=(a)=> {
    // alert("Recaptcha resolved with response: " + this.recaptcha.getResponse());
    const data = JSON.stringify({
        regno: this.state.regno,
        password: this.state.password,
      });

      // console.log(data);
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
          sessionStorage.setItem("Token", response.data.Token);
          // console.log(response.data);
          a.history.push("/selection");
        })
        .catch(function (error) {
          alert(error.response.data.message);
          // console.log(error);
        });
  }
  render() {
    return (
      <>
      <Background>
        <div className='heading'>Log In</div>
        <div className='input-grp'>
          <label id='p2'>Registration Number</label>
          <input
            className='input t-uc'
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
          <label id='p1'>Password</label>
          <input
            className='input'
            type={`${this.state.showPass ? "text" : "password"}`}
            placeholder='Enter Your Password'
            style={{ marginBottom: 10, position: "relative" }}
            onChange={(event) => {
              this.inputChangeHandler(event, "password");
            }}
          />
          <div
            className={`lgn-eye ${this.state.showPass ? "lgn-eye-t" : null}`}
            onClick={this.eyeClickHandler}>
            <i className={`fas fa-eye  `}></i>
          </div>
        </div>
        {this.state.passError ? (
          <div className='error'>{this.state.passError}</div>
        ) : null}
        <div className='forgot-pass'>
          <Link to='/forgotPassword'>Forgot Password?</Link>
        </div>
        <div
          className='btn btn-blue lgn-btn'
          onClick={(event) => {
            this.formSubmitHandler(event, this.props);
          }}>
          Log In
        </div>
        
      </Background>
      <Recaptcha
          ref={(ref) => (this.recaptcha = ref)}
          sitekey='6LerFBIaAAAAAPrLv6zWVFAZ7VQYGE8DfbUXyt8r
'
          onResolved={()=>this.onResolved(this.props )}
          onError={() => {
            alert("Captcha Error : Please refresh site and try again");
          }}
        />
        </>
    );
  }
}

export default Login;
