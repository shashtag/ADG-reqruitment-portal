import React, { Component } from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal-contact display-block" : "modal-contact display-none";

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <h1 className="modal-heading">Contact Us</h1>
        <div className='sub-heading'>
          Incase of any queries or discrepancies,please feel free to contact us
          at: {" "} <br ></br>
          <a href='mailto:appledevelopersgroup@gmail.com'>
            appledevelopersgroup@gmail.com
          </a>
        </div>
        <button className='btn btn-blue cls-btn' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

class Footer extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className='footer'>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal>
        <div className='footer-info'>
          <div className='info-logo' onClick={this.showModal}>
            <i className='fas fa-info-circle'></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
