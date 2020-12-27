import React from "react";
import "./Quiz.css";
import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";
import Modal from "../Modals/Modal";

class TechQuiz extends React.Component {
  selectedOptions = [];
  constructor(props) {
    super(props);
    this.state = {
      quizQuestions: [],
      currentQuestionIndex: 0,
      questionId: [],
      finalResponse: [],
      optionsIndex1: ["d", "d", "d", "e", "e", "e", "e", "e", "e", "e"],
      optionsIndex: ["9", "9", "9", "9", "9", "9", "9", "9", "9", "9"],
      showModal: false,
      blueButton: "blueButton",
      blackButton: "blackButton",
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

  async getQuizQuestions() {
    await fetch(
      "https://adgrecruitments.herokuapp.com/questions/technical/get-quiz-questions/1/web",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("Token"),
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          quizQuestions: data,
        });
        this.generateResponse();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async submitQuiz() {
    await fetch("https://adgrecruitments.herokuapp.com/user/technical/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("Token"),
      },
      body: JSON.stringify(this.state.finalResponse),
    })
      .then((response) => {
        this.props.history.push("thank-you");

        return response.json();
      })

      .catch((error) => {
        alert(error.message);
      });
  }

  optionsArray = ["a", "b", "c", "d"];

  getResponse() {
    return this.state.finalResponse[this.state.currentQuestionIndex];
  }

  updateOption(qid, index) {
    this.state.finalResponse.forEach((question) => {
      if (question.qid === qid) {
        question.response = this.optionsArray[index];
        this.setState({
          blueButton: "blackButton",
        });
      }
    });
  }

  generateResponse() {
    this.state.quizQuestions.forEach((question) => {
      var temp = {
        qid: question._id,
        response: "e",
      };
      this.state.finalResponse.push(temp);
    });
  }

  returnQuestionID() {
    return this.state.quizQuestions[this.state.currentQuestionIndex]._id;
  }

  gotoNextQuestion() {
    if (this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        blueButton: "blueButton",
      });
    } else return;
  }

  gotoPreviousQuestion() {
    if (this.state.currentQuestionIndex > 0)
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1,
        blueButton: "blueButton",
      });
    else return;
  }

  componentDidMount() {
    this.getQuizQuestions();
  }

  componentWillUnmount() {
    this.submitQuiz();
  }

  render() {
    if (!sessionStorage.getItem("Token")) {
      return <Redirect to='/' />;
    }
    return (
      <Background>
        {this.state.quizQuestions.length === 0 ? (
          <div className='loading'>Loading...</div>
        ) : (
          <>
            <div className='heading'>Technical Quiz</div>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {this.state.currentQuestionIndex + 1}</span>/
                {this.state.quizQuestions.length}
              </div>
              <div className='tech-quiz'>
                {
                  this.state.quizQuestions[this.state.currentQuestionIndex]
                    .questionDescription
                }
              </div>
              <div className='answer-section'>
                {Object.keys(
                  this.state.quizQuestions[this.state.currentQuestionIndex]
                    .options,
                ).map((key, index) => {
                  if (
                    this.state.finalResponse[
                      this.state.currentQuestionIndex
                    ] === undefined
                  ) {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          this.updateOption(this.returnQuestionID(), index);
                        }}>
                        <button
                          className={this.state.blackButton}
                          value={this.optionsArray[index]}>
                          {this.optionsArray[index]}.{" "}
                          {
                            this.state.quizQuestions[
                              this.state.currentQuestionIndex
                            ].options[key]
                          }
                        </button>
                      </div>
                    );
                  } else {
                    if (
                      this.state.finalResponse[this.state.currentQuestionIndex]
                        .response === this.optionsArray[index]
                    ) {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            this.updateOption(this.returnQuestionID(), index);
                          }}>
                          <button
                            className={this.state.blueButton}
                            value={this.optionsArray[index]}>
                            {this.optionsArray[index]}.{" "}
                            {
                              this.state.quizQuestions[
                                this.state.currentQuestionIndex
                              ].options[key]
                            }
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            this.updateOption(this.returnQuestionID(), index);
                          }}>
                          <button
                            className={this.state.blackButton}
                            value={this.optionsArray[index]}>
                            {this.optionsArray[index]}.{" "}
                            {
                              this.state.quizQuestions[
                                this.state.currentQuestionIndex
                              ].options[key]
                            }
                          </button>
                        </div>
                      );
                    }
                  }
                })}
              </div>
              <div className='btn-bottom'>
                {this.state.currentQuestionIndex === 0 ? (
                  <button disabled={true} id='disabled-btn'>
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
                {this.state.currentQuestionIndex === 9 ? (
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
              <div className='timer'>
                <Timer />
              </div>
            </div>
          </>
        )}
      </Background>
    );
  }
}

export default TechQuiz;
