import React,{ useState } from "react";
import { v4 as uuid } from "uuid";
import Background from '../../hoc/Background/Background';
import TechQuestions from '../../components/AdminQuestions/Questions/TechnicalQuestions';
import DesignQuestions from '../../components/AdminQuestions/Questions/DesignQuestions';
import MgmtQuestions from '../../components/AdminQuestions/Questions/MgmtQuestions';

import classes from './Admin.module.css';
const Admin = (props)=>{
    const [techQuestions,setTechQuestions]=useState([
        {
            id:uuid(),
            questionDescription: "What is your name?",
            options : {
               a:"anuj",
               b:"bharat",
               c:"rahul",
               d:"preetham"
                       },
               correctOption :"c",
               yearofstudy:1
           }
        ]);
    const [designQuestions,setDesignQuestions]=useState([
        {
            id:uuid(),
            questionDescription:"hello bro", 
            yearofstudy:1          
        }
    ]);
    const [mgmtQuestions,setMgmtQuestions]=useState([
        {
            id:uuid(),
            questionDescription:"hello bro",  
            yearofstudy:1         
        }
    ]);
    // function addMgmtQuestion(){
    //     let description="xyx";
    //     let year=1;
    //     setDesignQuestions(prevQ=>{
    //         return [...prevQ,{id:uuid(),questionDescription:description,yearofstudy:year}]
    //     });
    // }
    function addDesignQuestion(){
        let description="xyx";
        let year=1;
        setDesignQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:description,yearofstudy:year}]
        });
        console.log(designQuestions);
    }
    // function deleteMgmtQuestion(){

    // }
    // function deleteDesignQuestion(){
        
    // }
    // function addTechQuestion(){
    //     setTechQuestions((prevQ)=>{
    //         let description="xyz";
    //         return {...prevQ,{id:uuid(),questionDescription: description}};
    //     });}
    const [checkVal,setCheckVal]=useState("");
    function getSelectedVal(event){
        // console.log(event.target.value);
        setCheckVal(event.target.value);
    } 
    return(
    <Background>
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
       <TechQuestions 
       selectedValue={checkVal}/>
       <DesignQuestions 
       selectedValue={checkVal}
       onAdd={addDesignQuestion}/>
       <MgmtQuestions 
       selectedValue={checkVal}/>
    </Background>
    )};
export default Admin;