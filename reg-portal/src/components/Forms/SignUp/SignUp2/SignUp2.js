import React from "react";
import "./SignUp2.css";
import Background from "../../../../hoc/Background/Background";

export const SignUp2 = () => {
  return (
    <Background>
      <from>
        <div className='heading'>Sign Up</div>
        <div className='input-grp'>
          <label>Phone</label>
          <input
            className='input'
            type='text'
            placeholder='Enter your phone no.'
          />
        </div>
        <div className='input-grp'>
          <label>VIT-Email</label>
          <input
            className='input'
            type='text'
            placeholder='Enter your VIT Email'
          />
        </div>
        <div className='input-grp'>
          <label>Github</label>
          <input
            className='input'
            type='text'
            placeholder='Enter your github handle'
          />
        </div>
        <button className='sub-btn' type='submit'>
          Sign Up
        </button>
      </from>
    </Background>
  );
};
export default SignUp2;
