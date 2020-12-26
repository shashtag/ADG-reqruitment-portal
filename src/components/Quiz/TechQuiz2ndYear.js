import React from "react";
import "./Quiz.css";
// import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";
import Modal from "../Modals/Modal";

class TechQuiz2ndYear extends React.Component {
  selectedOptions = [];
  constructor(props) {
    super(props);
    this.state = {
      brief: "",
      projects: "",
      showModal: false,
    };
    this.submitQuiz = this.submitQuiz.bind(this);
    this.showModal1 = this.showModal1.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal1() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  async submitQuiz() {
    // const quizResponse = {qid: this.state.questionId, response: this.state.selectedOptions }
    // console.log("Inside submitQuiz", this.selectedOptions);
    await fetch(
      "https://adgrecruitments.herokuapp.com/user/technical2/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("Token"),
        },
        body: JSON.stringify({ brief: this.brief, projects: this.projects }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  componentWillUnmount() {}

  render() {
    if (!sessionStorage.getItem("Token")) {
      return <Redirect to="/" />;
    }
    return (
      <Background>
        <>
          <div className="heading">Technical Quiz</div>
          <div className="question-section">
            <div className="answer-section">
              <div className="question-text sub-heading">
                Projects [Brief description, Tech (Stack), Link]
              </div>
              <textarea
                className="mgmt-answer"
                placeholder="Enter your answer..."
                value={this.state.brief}
                onChange={(e) => {
                  this.setState({ brief: e.target.value });
                }}
              />
              <div className="question-text sub-heading">
                Brief about yourself
              </div>
              <textarea
                className="mgmt-answer"
                placeholder="Enter your answer..."
                value={this.state.projects}
                onChange={(e) => {
                  this.setState({ projects: e.target.value });
                }}
              />
            </div>
            <div className="btn-bottom">
              <button
                onClick={() => {
                  this.showModal1();
                }}>
                Submit
              </button>
            </div>
            {/* <div className="timer">
                <Timer />
              </div> */}
          </div>
          <Modal
            show={this.state.showModal}
            onHide={this.hideModal}
            submitQuiz={this.submitQuiz}
          />
        </>
      </Background>
    );
  }
}

export default TechQuiz2ndYear;
