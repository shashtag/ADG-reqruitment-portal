import React,{ useState } from "react";
import Background from '../../hoc/Background/Background';
import TechQuestions from '../../components/AdminQuestions/Questions/TechnicalQuestions';
import DesignQuestions from '../../components/AdminQuestions/Questions/DesignQuestions';
import MgmtQuestions from '../../components/AdminQuestions/Questions/MgmtQuestions';
import classes from './Admin.module.css';
import { Redirect } from "react-router-dom";

const Admin = (props)=>{
    const [checkVal,setCheckVal]=useState("");
    function getSelectedVal(event){
        setCheckVal(event.target.value);
    }

    const isLoggedIn = !!sessionStorage.getItem("admin");
    if(!isLoggedIn) {
        return(
            <Redirect to="/admin-login" />
        )
    }
    
    return(
    <Background>
        <div>
        <div className={classes.heading}>
            <h1>Administrator Portal</h1>
            <p>Create, Edit and Manage Domain Specific Quizzes and Questions</p>
        </div>
        <form>
            <div className={classes.formContainer} onChange={getSelectedVal}>
            <input type="radio" value="technical" name="selection" id="technical" visibility="hidden"  className={classes.input} ></input>
            <label htmlFor="technical" className={classes.label}>Technical</label>
            <input type="radio" value="design" name="selection" id="design" visibility="hidden" className={classes.input} ></input>
            <label htmlFor="design" className={classes.label}>Design</label>
            <input type="radio" value="management" name="selection" id="management" visibility="hidden" className={classes.input} ></input>
            <label htmlFor="management" className={classes.label}>Management</label>
            </div>
        </form>
       <TechQuestions selectedValue={checkVal}/>
       <DesignQuestions selectedValue={checkVal}/> 
       <MgmtQuestions selectedValue={checkVal} />
       </div>
    </Background>
    )};
export default Admin;
