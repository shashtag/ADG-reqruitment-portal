import React from "react";
import "./SignUp2.css";

export const SignUp2 = () => {
  return (
    <div className="sign2-wrap">
      <p>Sign Up</p>
      <br></br>
      <div className="Phone">
        <label id="phone">Phone</label>
        <br></br>
        <input type="text" placeholder="Enter your phone no." />
      </div>
      <br></br>
      <div className="VIT-Email">
        <label id="vit">VIT-Email</label>
        <br></br>
        <input type="text" placeholder="Enter your VIT Email" />
      </div>
      <br></br>
      <div className="Github">
        <label id="git">Github</label>
        <br></br>
        <input type="text" placeholder="Enter your github handle" />
        <br></br>
        <br></br>
        <a className="myButton3">Submit</a>
      </div>
    </div>
  );
};
export default SignUp2;
