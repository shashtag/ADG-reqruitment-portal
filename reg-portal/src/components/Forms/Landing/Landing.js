import React from 'react';
import './Landing.css';
import { Link } from "react-router-dom";
import Background from '../../../hoc/Background/Background'

const Landing = () => {
    return (

      <Background>
        <div className="land-wrap">
          <p id="head">Recruitment Portal</p>
          <br></br>
          <p id="one">
            Welcome to the recruitment portal for<br></br>
            Apple Developer's Group
          </p>
          <br></br>
          <p id="two">Sign up to get started</p>
          <br></br>
          <Link to = "/signup" id="signup">
            Sign Up
          </Link>
    
          <br></br>
          <br></br>
          <Link to = "/login" id="login">
          Login
          </Link>
        </div>
      </Background>
    );
}
export default Landing;
