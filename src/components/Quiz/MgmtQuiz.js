import React from "react";
import "./Quiz.css";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";
import Modal from "../Modals/Modal";

class MgmtQuiz extends React.Component {
  responsesArray = [];
  constructor(props) {
    super(props);
    this.state = {
      quizQuestions: [],
      currentQuestionIndex: 0,
      questionId: [],
      showModal: false,
      inputValues: ["", "", "", "", "", ""],
    };
    this.submitQuiz = this.submitQuiz.bind(this);
    this.setResponsesArray = this.setResponsesArray.bind(this);
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

  async getQuizQuestions() {
    await fetch(
      "https://adgrecruitments.herokuapp.com/questions/management/get-quiz-questions/web",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("Token"),
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          quizQuestions: data,
        });
      })
      .catch((error) => {
        alert(error.message);
        // this.history.push("/");
      });
  }

  async submitQuiz() {
    await fetch(
      "https://adgrecruitments.herokuapp.com/user/management/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("Token"),
        },
        body: JSON.stringify(this.responsesArray),
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

  setResponsesArray(qid, e) {
    var response = [...this.state.inputValues];
    response[this.state.currentQuestionIndex] = e.target.value;
    this.setState({ inputValues: response });
    if (this.responsesArray.some((response) => response.qid === qid)) {
      for (let i = 0; i < this.responsesArray.length; i++) {
        if (this.responsesArray[i].qid === qid) {
          this.responsesArray[i].response = e.target.value;
        }
      }
    } else {
      this.responsesArray.push({ qid: qid, response: e.target.value });
    }
  }

  gotoNextQuestion() {
    if (this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
      });
    } else return;
  }
  gotoPreviousQuestion() {
    if (this.state.currentQuestionIndex > 0) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1,
      });
    } else return;
  }

  componentDidMount() {
    this.getQuizQuestions();
  }

  componentWillUnmount() {
    this.submitQuiz();
    window.location.href = "/";
  }

  render() {
    if (!sessionStorage.getItem("Token")) {
      return <Redirect to="/" />;
    }
    return (
      <Background>
        {this.state.quizQuestions.length === 0 ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="heading">Management Quiz</div>
            <div className="question-section">
              <div className="question-count">
                <span>Question {this.state.currentQuestionIndex + 1}</span>/
                {this.state.quizQuestions.length}
              </div>
              <div className="management-quiz">
                {
                  this.state.quizQuestions[this.state.currentQuestionIndex]
                    .description
                }
              </div>
              <div className="answer-section">
                <textarea
                  className="mgmt-answer"
                  placeholder="Enter your answer..."
                  value={
                    this.state.inputValues[this.state.currentQuestionIndex]
                  }
                  onChange={(e) => {
                    this.setResponsesArray(
                      this.state.quizQuestions[this.state.currentQuestionIndex]
                        ._id,
                      e
                    );
                  }}
                />
              </div>
              <div className="btn-bottom">
                {this.state.currentQuestionIndex === 0 ? (
                  <button disabled={true} id="disabled-btn">
                    Previous
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.gotoPreviousQuestion();
                    }}>
                    Previous
                  </button>
                )}
                {this.state.currentQuestionIndex === 4 ? (
                  <button
                    onClick={() => {
                      this.showModal1();
                    }}>
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.gotoNextQuestion();
                    }}>
                    Next
                  </button>
                )}
                <Modal
                  show={this.state.showModal}
                  onHide={this.hideModal}
                  submitQuiz={this.submitQuiz}
                />
              </div>
            </div>
          </>
        )}
      </Background>
    );
  }
}

export default MgmtQuiz;
