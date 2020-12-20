import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Background from "../../../hoc/Background/Background";
import gear from "../../../assets/img/settings-gear-63.svg";

const DomainPage = (props) => {
  if (!sessionStorage.getItem("Token")) {
    props.history.replace("/");
  }
  const [domain, setDomain] = useState("");
  const [tech, setTech] = useState(false);
  const [man, setMan] = useState(false);
  const [des, setDes] = useState(false);

  let domainValue = (event) => {
    setDomain(event.target.value);
  };

  const linkTo = {
    pathname: "/instructions",
    param: domain,
  };
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
            className={classes.input}></input>
          <label htmlFor='design' className={`${classes.label} `}>
            <i className='fas fa-drafting-compass dom-pg-ico'></i>
            Design
          </label>
        </div>

        <Link to={linkTo} className='btn btn-blue lgn-btn'>
          Start Quiz
        </Link>
      </div>
    </Background>
  );
};
export default DomainPage;
