import React,{ useState } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const MgmtQuestions = (props)=>{
    const [questionDescription,setQuestionDescription]=useState("");
    let inputValue = (event)=>{ setQuestionDescription(event.target.value) }

    const [yearofstudy,setYearofstudy]=useState(1);
    let yearValue = (event) =>{ setYearofstudy(event.target.value) }

    const [files, setFiles] = useState({});
        let getFile = (file)=>{ setFiles(file) }

    const [mgmtQuestions,setMgmtQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription:"hello bro", 
        //     yearofstudy:1,
        //     file:""       
        // }
    ]);
    async function addMgmtQuestion(){
        setMgmtQuestions(prevQ=>{
            return [...prevQ,{id:uuid(),questionDescription:questionDescription,yearofstudy:yearofstudy,file:files.base64}]
        });

        const questionObject = {description:questionDescription, questionImage:files.base64};

        await fetch("https://adgrecruitments.herokuapp.com/admin/management/add-question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMyNmI1NTNiNzgwMTE4N2IyZWE4ZTgiLCJpYXQiOjE2MDY3NjAwMTl9.DB2DxgaWierOYKZ4EJX44R9NXrEE5JwT0c2PaHSJAk4",
            },
            body: JSON.stringify(questionObject)
        })
        .then(function(response) {
            // console.log(questionObject);
            // console.log(response);
            return response.json();
        }).then(function(data) {
            // console.log(data);
        }).catch(error => {
            // console.log(error)
            alert("Error: ", error);
        })

        setFiles({});
        setQuestionDescription("");
    }
    function deleteMgmtQuestion(id){
        setMgmtQuestions((prevQ)=>{
            return prevQ.filter((question,index)=>{
                return question.id !==id;
            })
        })
    }
    const [showModal,setShowModal]=useState(false);
    let showModal1 = ()=>{ setShowModal(true) }
    let hideModal = ()=>{ setShowModal(false) }
    
    let showQuestions=props.selectedValue==="management" ? "management": "display-none";
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={showModal1}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={hideModal} questionDescription={questionDescription} selected={props.selectedValue} 
            setQuestionDescription={inputValue} inputYear={yearValue} 
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
