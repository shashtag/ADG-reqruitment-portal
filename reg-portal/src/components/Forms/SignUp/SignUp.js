import React, { Component } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";

export class SignUp extends Component {
  render() {
    return (
      <Background>
        <form>
          <div className='heading'>Sign Up</div>
          <div className='input-grp'>
            <label>Name</label>
            <input
              className='input'
              type='text'
              // value={name}
              placeholder='Enter your name'
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
            />
            {/* {Object.keys(nameErr).map((key) => {
              return <div style={{ color: "red" }}>{nameErr[key]}</div>;
            })} */}
          </div>
          <div className='input-grp'>
            <label>Registration Number</label>
            <input
              className='input'
              type='text'
              // value={regno}
              placeholder='Enter Registration number'
              // onChange={(e) => {
              //   setRegno(e.target.value);
              // }}
            />
            {/* {Object.keys(regnoErr).map((key) => {
              return <div style={{ color: "red" }}>{regnoErr[key]}</div>;
            })} */}
          </div>
          <div className='input-grp'>
            <label>Password</label>
            <input
              className='input'
              type='password'
              // value={pass1}
              placeholder='Enter your password'
              // onChange={(e) => {
              //   setPass(e.target.value);
              // }}
            />
            {/* {Object.keys(pass1Err).map((key) => {
              return <div style={{ color: "red" }}>{pass1Err[key]}</div>;
            })} */}
          </div>
          <div className='input-grp'>
            <label>Confirm password</label>
            <input
              className='input'
              type='password'
              // value={pass2}
              placeholder='Confirm password'
              // onChange={(e) => {
              //   setPass2(e.target.value);
              // }}
            />
            {/* {Object.keys(pass2Err).map((key) => {
              return <div style={{ color: "red" }}>{pass2Err[key]}</div>;
            })} */}
          </div>
          <button className='sub-btn' type='submit'>
            Create account
          </button>

          {/*<a className="myButton">Submit</a>*/}

          <Link to='/signup2'>
            Click here if you're an applicant in 2<sup>nd</sup> Year
          </Link>
        </form>
      </Background>
    );
  }
}

export default SignUp;
