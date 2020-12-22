import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
// import { faTimes } from "@fortawesome/free-brands-svg-icons";
import "./Modal.css";
// import FontAwesome from "react-fontawesome";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = (props) => {
    let modalRef=useRef()
    // useEffect(()=>{
    //     document.addEventListener("click",(event)=>{
    //     if(!modalRef.current.contains(event.target)){
    //         props.onHide();
    //     }
    //     });
    // });
    const modalClass = props.show ? "modal" : "modal display-none";
    return (
        <div className={modalClass}>
        <div className="modal-main" ref={modalRef}>
            {/* <FontAwesomeIcon icon={ faTimes } className="times" /> */}
            <h4>Confirm Submission</h4>
            <p>You won't be able to re-attempt or change your answers!</p>
            <div className='sub-btns'>
                <Link className='noUn' to="/thank-you"><button onCLick={ props.submitQuiz } className="btn submit-btn mod-btn">Confirm</button></Link>
                <button className='btn submit-btn mod-btn' onClick={props.onHide}>Close</button>
            </div>
            </div>
        </div>
    )};
export default Modal;
