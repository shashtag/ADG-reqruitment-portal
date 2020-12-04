import React,{ useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

let questionid;
let index=0;
const TechQuestions = (props)=>{
        const [inputOption,setInputOption]=useState("");
        function optionValue(event){
            // console.log(event.target.value);
            const newOption=event.target.value;
            setInputOption(newOption);
        }
        const [options,setOptions]=useState({});
        function addOption(inputText){
            setOptions((prevOptions)=>{
                return {...prevOptions,[index]:inputText}});
            // console.log(options);
            index++;
        }
        function generateId(){
            questionid=uuid();
        }
        const [techQuestions,setTechQuestions]=useState([
        {
            id:uuid(),
            questionDescription: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
            options : {
               1:"pop()",
               2:"push()",
               3:"map()",
               4:"join()"
            },
            correctOption :"c",
            yearofstudy:1
           }
        ]);
        function addTechQuestion(){
            // console.log("addquestion",questionid);
            setTechQuestions((prevQ)=>{
                return [...prevQ,{id:questionid,questionDescription:props.inputText,yearofstudy:props.inputYear,options:options}]
            })
            setOptions({});
            index=0;
            console.log(techQuestions);
        }
        function deleteTechQuestion(id){
            setTechQuestions((prevQ)=>{
                return prevQ.filter((question,index)=>{
                    return question.id !==id;
                })
            })
        }
    const [showModal,setShowModal]=useState(false);
    function toggle(){
        setShowModal(!showModal);
    }
    function multipleFunctions(){
        toggle();
        generateId();
    }
    let showQuestions=props.selectedValue==="technical" ? "technical": "display-none";
    // console.log(showQuestions);
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={multipleFunctions}>Add Question</button>
            </div>
            <Modal 
            show={showModal} 
            onHide={toggle} 
            genId={generateId} 
            selected={props.selectedValue} 
            inputText={props.text} 
            inputYear={props.year} 
            addQuestion={addTechQuestion} 
            addOption={addOption} 
            id={questionid} 
            inputOption={optionValue} 
            inputOptionVal={inputOption}
            options={options}/>
                {techQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div>
                            <div className={classes.options}>
                                <div>({index+1})</div>
                                <div className={classes.questionDescrip}>{question.questionDescription}</div>
                            </div>
                            <OptionsDisplay questions={question.options}/>
                        </div>
                        <button onClick={()=>deleteTechQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default TechQuestions;

export const OptionsDisplay = (props)=>{
    const questions=props.questions;
    if(props.questions){
    return(
        <div>
            {Object.keys(questions).map((index)=>(
                <div className={classes.options} key={index}>
                    <div className={classes.index}>{index}.</div>
                    <div key={index}>{questions[index]}</div>
                </div>
            ))}
        </div>
    )} else {
        return null
    }
}