import React from "react";
import Background from "../../../../hoc/Background/Background";

export const Login = () => {
  return (
    <Background>
      <div className='heading'>Log In</div>
      <div className='input-grp'>
        <label id='p2'>Registration Number</label>
        <input
          className='input'
          type='text'
          placeholder='Enter Registration number'
        />
      </div>
      <div className='input-grp'>
        <label id='p1'>Password</label>
        <input
          className='input'
          type='password'
          placeholder='Enter your password'
          style={{ marginBottom: 10 }}
        />
        <div className='btn btn-blue' style={{ width: "94%" }}>
          Submit
        </div>
      </div>
    </Background>
  );
};
export default Login;
