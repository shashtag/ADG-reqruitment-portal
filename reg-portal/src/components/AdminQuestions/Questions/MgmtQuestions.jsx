import React,{ useState } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const MgmtQuestions = (props)=>{
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
    const [mgmtQuestions,setMgmtQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription:"hello bro", 
        //     yearofstudy:1,
        //     file:""       
        // }
    ]);
    function addMgmtQuestion(){
        setMgmtQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:inputText,yearofstudy:selectYear,file:files}]
        });
        setFiles({});
        setInputText("");
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
            <Modal show={showModal} onHide={toggle} text={inputText} selected={props.selectedValue} 
            inputText={inputValue} inputYear={yearValue} 
            addQuestion={addMgmtQuestion} getFile={getFile}/>
                {mgmtQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                    <div className={classes.descrip}>
                    <div>{index+1}.</div>
                    <div>{question.questionDescription}</div>
                    <div className={Object.keys(question.file).includes('base64') ? "display-image" :"display-none"}><br />
                        <img src={question.file.base64} alt="Q.img" className={classes.image}></img>
                    </div></div>
                    <button onClick={()=>deleteMgmtQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default MgmtQuestions;
