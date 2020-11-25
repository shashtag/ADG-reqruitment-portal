import React from 'react';
import './Landing.css';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
      <div>
        <div className="land-wrap">
          <p id="head">Recruitment Portal</p>
          <br></br>
          <p id="one">
            Welcome to the recruitment portal for<br></br>
            Apple Developer's Group
          </p>
          <br></br>
          <br></br>
          <p id="two">Sign up to get started</p>
          <br></br>
          <Link to = "/signup">
            <a id="signup">Sign Up</a>
          </Link>
    
          <br></br>
          <br></br>
          <Link to = "/login">
          <a id="login">Login</a>
          </Link>
        </div>
      </div>
    );
}
export default Landing;
