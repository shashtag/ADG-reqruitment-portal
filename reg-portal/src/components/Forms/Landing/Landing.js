import React from "react";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";


const Landing = () => {
  return (
    <Background>
      <div className='heading'>Recruitment portal</div>
      <div className='sub-heading'>
        Welcome to the recruitment portal for<br></br>
        Apple Developer's Group
      </div>
      <div className='heading2'>Sign up to get started</div>

      <Link to='/signup' className='btn btn-blue'>
        Sign Up
      </Link>

      <Link to='/login' className='btn btn-trans'>
        Login
      </Link>
    </Background>
  );
};
export default Landing;
