import React from "react";
import "./Modal.css";

const Modal = (props) => {
  const modalClass = props.show ? "modal display-block" : "modal display-none";
  // console.log(modalClass,props.show)
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
            <input type="radio" value="subjective" name="qtype" id="subjective" ></input>
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
        <button onClick={props.onHide}>Close</button>
        <button onClick={props.addQuestion}>Add Question</button>
      </div>
    </div>
  );
};
export default Modal;
