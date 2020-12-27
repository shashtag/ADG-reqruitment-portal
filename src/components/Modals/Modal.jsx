import React from "react";
import { useRef } from "react";
// import cross from "../../assets/img/cross.svg";
// import { faTimes } from "@fortawesome/free-brands-svg-icons";
import "./Modal.css";
// import FontAwesome from "react-fontawesome";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = (props) => {
  let modalRef = useRef();
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
      <div className='modal-main confirm' ref={modalRef}>
        <div className='close' onClick={props.onHide}></div>
        <h1 className='submit-heading'>Confirm Submission</h1>
        <div className='sub-heading'>
          You won't be able to re-attempt or change your answers!
        </div>
        <div className='sub-btns'>
          <button onClick={props.submitQuiz} className='btn submit-btn mod-btn'>
            Confirm
          </button>
          {/* <button className='btn submit-btn mod-btn' onClick={props.onHide}>Close</button> */}
        </div>
      </div>
    </div>
  );
};
export default Modal;
