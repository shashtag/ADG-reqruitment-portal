import React,{ useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

let questionid;
let index=0;
const TechQuestions = (props)=>{
        const [inputText,setInputText]=useState("");
        function inputValue(event){
            var newItem=event.target.value;
            setInputText(newItem);
        }
        const [selectYear,setSelectYear]=useState(1);
        function yearValue(event){
            var newItem=event.target.value;
            setSelectYear(newItem);
        }
        const [files, setFiles] = useState({});
        function getFile(file){
            setFiles(file);
        }
        const [inputOption,setInputOption]=useState("");
        function optionValue(event){
            const newOption=event.target.value;
            setInputOption(newOption);
        }
        const [options,setOptions]=useState({});
        function addOption(inputText){
            setOptions((prevOptions)=>{
                setInputOption("");
                return {...prevOptions,[index]:inputText}});
            // console.log(options);
            index++;
        }
        const[correctOption,setCorrectOption]=useState("")
        function getCorrectOption(event){
            setCorrectOption(event.target.value);
        }
        function generateId(){
            questionid=uuid();
        }
        const [techQuestions,setTechQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        //     options : {
        //        1:"pop()",
        //        2:"push()",
        //        3:"map()",
        //        4:"join()"
        //     },
        //     correctOption :"c",
        //     yearofstudy:1,
        //     file:{}
        //    }
        ]);
        function addTechQuestion(){
            setTechQuestions((prevQ)=>{
                return [...prevQ,{id:questionid,questionDescription:inputText,yearofstudy:selectYear,options:options,file:files,correctOption:correctOption}]
            })
            console.log(techQuestions);
            setInputText("");
            setOptions({});
            setFiles({});
            index=0;
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
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={multipleFunctions}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} genId={generateId} selected={props.selectedValue} 
            inputText={inputValue} inputYear={yearValue} text={inputText} optionText={inputOption}
            addQuestion={addTechQuestion} id={questionid} 
            addOption={addOption} inputOption={optionValue} inputOptionVal={inputOption} options={options} getCorrectOption={getCorrectOption}
            getFile={getFile}
            />
                {techQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div>
                            <div className={classes.options}>
                                <div>{index+1}.</div>
                                <div className={classes.questionDescrip}>{question.questionDescription}</div>
                                <div className={Object.keys(question.file).includes('base64') ? "display-image" :"display-none"}>
                                <img src={question.file.base64} alt="Q.img" className={classes.image}></img>
                                </div>
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
                <div className={classes.optionsContainer} key={index}>
                    <div className={classes.index}>{index}.</div>
                    <div key={index}>{questions[index]}</div>
                </div>
            ))}
        </div>
    )} else {
        return null
    }
}