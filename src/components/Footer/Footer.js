import React,{Component} from "react";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h3>Contact Us</h3>
                <p>Incase of any queries or discrepancies, please feel free to contact us at <a href='mailto:adgvit@vit.ac.in'>appledevelopersgroup@gmail.com</a></p>
                <button className="btn btn-blue cls-btn" onClick={handleClose}>Close</button>
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
                <div className="footer-info">
                    <div className='info-logo' onClick={this.showModal}>
                        <i className="fas fa-info-circle" ></i>
                    </div>
                </div>

            </div>
        );
    };
}

export default Footer;


