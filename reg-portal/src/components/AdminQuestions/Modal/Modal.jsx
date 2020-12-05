import React from "react";
import { OptionsDisplay } from "../Questions/TechnicalQuestions";
import "./Modal.css";

const Modal = (props) => {
  function handleAddOptions(){
    props.addOption(props.inputOptionVal,props.id);
    console.log(props.options)
  }
  function handleClick(){
    props.onHide();
    props.addQuestion();
  }
  const modalClass = props.show ? "modal display-block" : "modal display-none";
  const showOptionsClass=props.selected==='technical' ? "display-options" : "hide-options";
  return (
    <div className={modalClass}>
      <div className="modal-main">
        <div className="modal-header">
          <h4 className="heading">Add Question</h4>
          <h5 className="q-no">No.4</h5>
        </div>
        <div className="input-field" onChange={props.inputText}>
          <label htmlFor="stmt" className="label">Statement:</label>
          <textarea id="stmt"/>
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
        <div className={showOptionsClass}>
            <div className="option">Options :</div>
            <OptionsDisplay questions={props.options} />
            <div>
            <button onClick={handleAddOptions} className="btn-addopt">+ Add</button>
            <input placeholder="Add Option" onChange={props.inputOption} className="input-option"></input>
            </div>
        </div>
        <button onClick={handleClick} className="submit-btn">Post Question</button>
      </div>
    </div>
  );
};
export default Modal;
