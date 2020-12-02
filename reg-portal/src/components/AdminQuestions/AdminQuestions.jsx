import React, {  useState } from 'react';
import classes from './AdminQuestions.module.css';
import Modal from './Modal';

const AdminQuestions =()=> {
    const [showModal,setShowModal]=useState(false);
    function toggle(){
        setShowModal(!showModal);
    }
    return(
        <div>
            {/* {this.props.selectedValue} */}
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={toggle}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={toggle} />
        </div>

    );
}
export default AdminQuestions;

