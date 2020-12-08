import React from "react";
import { useEffect } from "react";
import { useRef } from "react" 
import FileBase64 from 'react-file-base64';
import { OptionsDisplay } from "../Questions/TechnicalQuestions";
import "./Modal.css";

const Modal = (props) => {
  function handleAddOptions(){
    props.addOption(props.inputOptionVal,props.id);
  }
  function handleClick(){
    if(props.correctOption){
    props.onHide();
    props.addQuestion();
  } else {
    alert("Enter the correct option value to submit")
  }
}
  let modalRef=useRef()
  useEffect(()=>{
    document.addEventListener("mousedown",(event)=>{
      if(!modalRef.current.contains(event.target)){
        props.onHide();
      }
    });
  });
  let emptyFunction = ()=>{ return }
  const modalClass = props.show ? "modal display-block" : "modal display-none";
  const showOptionsClass=props.selected==='management' ? "hide-options" : "display-options";
  return (
    <div className={modalClass}>
      <div className="modal-main" ref={modalRef}>
        <div className="modal-header">
          <h4 className="heading">Add Question</h4>
        </div>
        <div className="input-field" onChange={props.inputText}>
          <label htmlFor="stmt" className="label">Statement:</label>
          <textarea id="stmt" value={props.text} onChange={emptyFunction}/>
        </div>
        <div className="type">
          <div>Type:</div>
          <div className="radio">
            <input type="radio" value="subjective" name="qtype" id="subjective"></input>
            <label htmlFor="subjective">Subjective</label>
          </div>
          <div className="radio">
            <input type="radio" value="objective" name="qtype" id="objective" ></input>
            <label htmlFor="objective">Objective</label>
          </div>
        </div>
        <div className="drop-down" onChange={props.inputYear}>
          <label htmlFor="yearofstudy">Choose year:</label>
              <select name="yearofstudy" id="yearofstudy">
                <option value="1">1</option>
                <option value="">2</option>
              </select>
        </div>
        <div className="image-container">
          <div>Image:</div>
          <FileBase64 multiple={false} onDone={x=>props.getFile(x)} />
        </div>
        <div className={showOptionsClass}>
            <div className="option">Options :</div>
            <OptionsDisplay questions={props.options} />
            <div>
            <button onClick={handleAddOptions} className="btn-addopt">+ Add</button>
            <input placeholder="Add Option" value={props.optionText} onChange={props.inputOption} className="input-option"></input>
            <input placeholder="Enter the index of the correct option" className="input-correct" onChange={props.getCorrectOption}/>
            </div>
        </div>
        <button onClick={handleClick} className="submit-btn">Post Question</button>
      </div>
    </div>
  );
};
export default Modal;
