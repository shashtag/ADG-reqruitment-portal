import React,{ useState } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const DesignQuestions = (props)=>{
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
    const [designQuestions,setDesignQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription:"hello bro", 
        //     yearofstudy:1,
        //      file:""       
        // }
    ]);
    function addDesignQuestion(){
        setDesignQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:inputText,yearofstudy:selectYear,file:files}]
        });
        setFiles({});
        setInputText("");
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
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={toggle}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} text={inputText} 
            inputText={inputValue} inputYear={yearValue} 
            addQuestion={addDesignQuestion} getFile={getFile}/>
                {designQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                    <div className={classes.descrip}>    
                    <div>{index+1}.</div>
                    <div className={classes.descripText}>{question.questionDescription}</div>
                    <div className={Object.keys(question.file).includes('base64') ? "display-image" :"display-none"}><br />
                        <img src={question.file.base64} alt="Q.img" className={classes.image}></img>
                    </div></div>
                    <button onClick={()=>deleteDesignQuestion(question.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default DesignQuestions;
