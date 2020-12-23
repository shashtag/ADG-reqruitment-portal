import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Background from "../../../hoc/Background/Background";
import axios from "axios";

const DomainPage = (props) => {
  if (!sessionStorage.getItem("Token")) {
    props.history.replace("/");
  }
  const [domain, setDomain] = useState(false);
  const [tech, setTech] = useState(true);
  const [man, setMan] = useState(true);
  const [des, setDes] = useState(true);

  let domainValue = (event) => {
    setDomain(event.target.value);
  };

  const linkTo = {
    pathname: "/instructions",
    param: domain,
  };
  useEffect(() => {
    var config = {
      headers: {
        "auth-token": sessionStorage.getItem("Token"),
      },
    };
    axios
      .get("https://adgrecruitments.herokuapp.com/user/getuser", config)
      .then(function (response) {
        console.log(response.data);
        setTech(response.data.userDetails.attemptedTechnical);
        setMan(response.data.userDetails.attemptedManagement);
        setDes(response.data.userDetails.attemptedDesign);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(props);
  return (
    <Background>
      <div className='heading'>Choose Domain</div>
      <div className='sub-heading'>Choose a domain to start the quiz</div>
      <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}
        onChange={domainValue}>
        <div className='rdio-grp lgn-btn'>
          <input
            type='radio'
            value='Technical'
            name='selection'
            id='technical'
            disabled={tech}
            className={classes.input}></input>
          <label htmlFor='technical' className={`${classes.label} `}>
            <i className='fas fa-cog dom-pg-ico'></i>
            Technical
          </label>
        </div>
        <div className='rdio-grp lgn-btn'>
          <input
            type='radio'
            value='Management'
            name='selection'
            id='management'
            disabled={man}
            className={classes.input}></input>
          <label htmlFor='management' className={`${classes.label} `}>
            <i className='fas fa-file-alt dom-pg-ico'></i>
            Management
          </label>
        </div>
        <div className='rdio-grp lgn-btn' style={{ marginBottom: "20px" }}>
          <input
            type='radio'
            value='Design'
            name='selection'
            id='design'
            disabled={des}
            className={classes.input}></input>
          <label htmlFor='design' className={`${classes.label} `}>
            <i className='fas fa-drafting-compass dom-pg-ico'></i>
            Design
          </label>
        </div>

        <Link to={linkTo} className={`btn btn-blue lgn-btn ${domain ? "":"disable-btn"}`} >
          Start Quiz
        </Link>
      </div>
    </Background>
  );
};
export default DomainPage;
