import React,{ useState } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const DesignQuestions = (props)=>{
    const [designQuestions,setDesignQuestions]=useState([
        {
            id:uuid(),
            questionDescription:"hello bro", 
            yearofstudy:1          
        }
    ]);
    function addDesignQuestion(){
        setDesignQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:props.inputText,yearofstudy:props.inputYear}]
        });
    }
    function deleteDesignQuestion(id){
        setDesignQuestions((prevQ)=>{
            return prevQ.filter((question,index)=>{
                return question.id !==id;
            })
        })
    }
    const [showModal,setShowModal]=useState(false);
    function toggle(){
        setShowModal(!showModal);
    }
    let showQuestions=props.selectedValue==="design" ? "design": "display-none";
    // console.log(showQuestions);
    return(
        <div className={showQuestions}>
            {/* {props.selectedValue} */}
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={toggle}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} inputText={props.text} inputYear={props.year} addQuestion={addDesignQuestion}/>
            <div>Hi iam a question:Design</div>
                {designQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                    <div>{question.questionDescription}</div>
                    <button onClick={()=>deleteDesignQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default DesignQuestions;
