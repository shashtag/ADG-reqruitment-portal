import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [pass1, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const [nameErr, setNameErr] = useState({});
  const [regnoErr, setRegnoErr] = useState({});
  const [pass1Err, setPassErr] = useState({});
  const [pass2Err, setPass2Err] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      //send to backend
      setName("");
      setRegno("");
      setPass("");
      setPass2("");
    }
  };
  const formValidation = () => {
    const nameErr = {};
    const regnoErr = {};
    const pass1Err = {};
    const pass2Err = {};
    let isValid = true;

    if (name.trim().length < 5) {
      nameErr.nameShort = "Name is too short";
      isValid = false;
    }

    if (name.trim().length > 30) {
      nameErr.nameLong = "Name is too long";
      isValid = false;
    }

    if (regno.trim().length > 10) {
      regnoErr.regnoLong = "Registration number is too long";
      isValid = false;
    }

    if (pass1.trim().length < 8) {
      pass1Err.pass1Short = "Password is too short";
      isValid = false;
    }
    if (pass2 != pass1) {
      pass2Err.pass2nomatch = "Password doesn't match";
      isValid = false;
    }
    setName(nameErr);
    setRegno(regnoErr);
    setPass(pass1Err);
    setPass2(pass2Err);
    return isValid;
  };
  return (
    <Background>
      <form onSubmit={onSubmit}>
        <div className='heading'>Sign Up</div>
        <div className='Name'>
          <label id='namee'>Name</label>
          <input
            type='text'
            value={name}
            placeholder='Enter your name'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {Object.keys(nameErr).map((key) => {
            return <div style={{ color: "red" }}>{nameErr[key]}</div>;
          })}
        </div>
        <br></br>
        <div className='regno'>
          <label id='reg'>Registration Number</label>
          <br></br>
          <input
            type='text'
            value={regno}
            placeholder='Enter Registration number'
            onChange={(e) => {
              setRegno(e.target.value);
            }}
          />
          <br></br>
          {Object.keys(regnoErr).map((key) => {
            return <div style={{ color: "red" }}>{regnoErr[key]}</div>;
          })}
        </div>
        <br></br>
        <div className='pass'>
          <label id='passs'>Password</label>
          <br></br>
          <input
            type='password'
            value={pass1}
            placeholder='Enter your password'
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          {Object.keys(pass1Err).map((key) => {
            return <div style={{ color: "red" }}>{pass1Err[key]}</div>;
          })}
        </div>
        <br></br>
        <div className='pass'>
          <label id='pass2'>Confirm password</label>
          <br></br>
          <input
            type='password'
            value={pass2}
            placeholder='Confirm password'
            onChange={(e) => {
              setPass2(e.target.value);
            }}
          />
          {Object.keys(pass2Err).map((key) => {
            return <div style={{ color: "red" }}>{pass2Err[key]}</div>;
          })}
        </div>
        <br></br>
        <br></br>
        <button type='submit'>Submit</button>
        {/*<a className="myButton">Submit</a>*/}
        <br></br>
        <br></br>
        <Link to='/signup2'>
          <a className='second'>
            Click here if you're an applicant in 2
            <span>
              <sup>nd</sup>
            </span>
            Year
          </a>
        </Link>
      </form>
    </Background>
  );
};
export default SignUp;
