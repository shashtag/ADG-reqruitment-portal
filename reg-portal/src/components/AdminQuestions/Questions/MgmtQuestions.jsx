import React,{ useState } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const MgmtQuestions = (props)=>{
    const [mgmtQuestions,setMgmtQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription:"hello bro", 
        //     yearofstudy:1          
        // }
    ]);
    function addMgmtQuestion(){
        setMgmtQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:props.inputText,yearofstudy:props.inputYear}]
        });
    }
    function deleteMgmtQuestion(id){
        setMgmtQuestions((prevQ)=>{
            return prevQ.filter((question,index)=>{
                return question.id !==id;
            })
        })
    }
    const [showModal,setShowModal]=useState(false);
    function toggle(){
        setShowModal(!showModal);
    }
    let showQuestions=props.selectedValue==="management" ? "management": "display-none";
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={toggle}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} inputText={props.text} inputYear={props.year} addQuestion={addMgmtQuestion}/>
                {mgmtQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                    <div>{question.questionDescription}</div>
                    <button onClick={()=>deleteMgmtQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default MgmtQuestions;
