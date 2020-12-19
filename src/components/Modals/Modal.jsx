import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

const Modal = (props) => {
    let modalRef=useRef()
    // useEffect(()=>{
    //     document.addEventListener("mousedown",(event)=>{
    //     if(!modalRef.current.contains(event.target)){
    //         props.onHide();
    //     }
    //     });
    // });
    const modalClass = props.show ? "modal" : "modal display-none";
    return (
        <div className={modalClass}>
        <div className="modal-main" ref={modalRef}>
            <h4>Confirm Submission</h4>
            <p>You won't be able to re-attempt or change your answers!</p>
            <Link to="/thank-you"><button className="submit-btn mod-btn">Confirm Submission</button></Link>
            <button onClick={props.onHide}>Close</button>
        </div>
        </div>
    )};
export default Modal;
