import React from "react";
import { Link } from "react-router-dom";
import Background from "../../../hoc/Background/Background";

const Landing = (props) => {
  if (sessionStorage.getItem("Token")) {
    props.history.replace("/selection");
  }
  return (
    <Background>
      <div className='heading'>Recruitment Portal</div>
      <div className='sub-heading'>
        Welcome to the recruitment portal for<br></br>
        Apple Developers Group
      </div>
      <div className='heading2'>Sign Up to get started</div>

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
