import React,{ useState } from "react";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const MgmtQuestions = (props)=>{
    const [showModal,setShowModal]=useState(false);
    function toggle(){
        setShowModal(!showModal);
    }
    let showQuestions=props.selectedValue==="management" ? "management": "display-none";
    // console.log(showQuestions);
    return(
        <div className={showQuestions}>
            {props.selectedValue}
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={toggle}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} />
        <div>Hi iam a question:management</div>
        {/* <button onClick={props.onAdd}>Add me</button> */}
        </div>
    );
}
export default MgmtQuestions;