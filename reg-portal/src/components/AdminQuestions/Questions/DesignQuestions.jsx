import React,{ useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

let questionid;
let index=0;
let optionNo=0;
const DesignQuestions = (props)=>{
        const [inputText,setInputText]=useState("");
        let inputValue = (event)=>{ setInputText(event.target.value) }

        const [selectYear,setSelectYear]=useState(1);
        let yearValue = (event) =>{ setSelectYear(event.target.value) }

        const [files, setFiles] = useState({});
        let getFile = (file)=>{ setFiles(file) }

        const [inputOption,setInputOption]=useState("");
        let optionValue = (event)=>{ setInputOption(event.target.value) }

        const [options,setOptions]=useState({});

        function addOption(inputText){
            if(inputText!==""){
                optionNo++;
                if(optionNo<=4){
                setOptions((prevOptions)=>{
                    setInputOption("");
                    return {...prevOptions,[index]:inputText}});
                // console.log(options);
                index++;
                } else 
                {
                    alert("Only 4 options per question!")
                    setInputOption("");
                };
            }
        }
        const[correctOption,setCorrectOption]=useState("")
        let getCorrectOption = (event)=>{ setCorrectOption(event.target.value); }

        let generateId = ()=>{ questionid = uuid() }

        const [designQuestions,setDesignQuestions]=useState([
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
        function addDesignQuestion(){
            setDesignQuestions((prevQ)=>{
                return [...prevQ,{id:questionid,questionDescription:inputText,yearofstudy:selectYear,options:options,file:files.base64,correctOption:correctOption}]
            })
            console.log("design",designQuestions);
            setCorrectOption("");
            setInputText("");
            setOptions({});
            setFiles({});
            index=0;
        }
        function deleteDesignQuestion(id){
            setDesignQuestions((prevQ)=>{
                return prevQ.filter((question,index)=>{
                    return question.id !==id;
                })
            })
        }


    const [showModal,setShowModal]=useState(false);
    let showModal1 = ()=>{ setShowModal(true) }
    let hideModal = ()=>{ setShowModal(false) }

    let multipleFunctions = () =>{ showModal1(); generateId(); }

    let showQuestions=props.selectedValue==="design" ? "design": "display-none";
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={multipleFunctions}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={hideModal} genId={generateId} selected={props.selectedValue} 
            inputText={inputValue} inputYear={yearValue} text={inputText} optionText={inputOption}
            addQuestion={addDesignQuestion} id={questionid} 
            addOption={addOption} inputOption={optionValue} inputOptionVal={inputOption} options={options} getCorrectOption={getCorrectOption}
            getFile={getFile}
            />
                {designQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div>
                            <div className={classes.options}>
                                <div>{index+1}.</div>
                                <div className={classes.questionDescrip}>{question.questionDescription}</div>
                                <div className={question.file ? "display-image" :"display-none"}>
                                <img src={question.file} alt="Q.img" className={classes.image}></img>
                                </div>
                            </div>
                            <OptionsDisplay questions={question.options}/>
                        </div>
                        <button onClick={()=>deleteDesignQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default DesignQuestions;

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