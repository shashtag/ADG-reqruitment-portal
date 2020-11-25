import React from "react";
import "./Login.css";

export const Login = () => {
  return (
    <div className="log-wrap">
      <p>Log In</p>
      <br></br>
      <div className="regno-log">
        <label id="p2">Registration Number</label>
        <br></br>
        <input type="text" placeholder="Enter Registration number" />
      </div>
      <br></br>
      <div className="pass-log">
        <label id = "p1">Password</label>
        <br></br>
        <input type="password" placeholder="Enter your password" />
        <br></br>
        <br></br>
        <a className="myButton-log">Submit</a>
      </div>
    </div>
  );
};
export default Login;
