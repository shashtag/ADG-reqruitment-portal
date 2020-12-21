import React from "react";
import "./Quiz.css";
import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";
import Modal from "../Modals/Modal";

class MgmtQuiz extends React.Component {
    responsesArray = [];
    // inputValue = [];
    constructor(props) {
        super(props);
        this.state =  {
            quizQuestions: [],
            time: 600,
            currentQuestionIndex: 0,
            questionId: [],
            showModal:false,
            inputValue: []
        };
        this.submitQuiz = this.submitQuiz.bind(this);
        this.setResponsesArray = this.setResponsesArray.bind(this);
        this.showModal1 = this.showModal1.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal1(){
        this.setState({
            showModal:true
        })
    }

    hideModal(){
        this.setState({
            showModal:false
        })
    }

    getTimer() {
        if (this.state.time > 0) {
            setTimeout(() => {
                this.setState({
                    time: this.state.time - 0.5
                });
            }, 1000);
        }
    }

    async getQuizQuestions() {
        await fetch("https://adgrecruitments.herokuapp.com/questions/management/get-quiz-questions/web", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("Token"),
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                quizQuestions: data
            });
            // console.log(this.state.quizQuestions);
        })
        .catch((error) => {
            // console.log(error.message);
            alert(error.message);
        })
    }

    async submitQuiz() {
        // const quizResponse = {qid: this.state.questionId, response: this.state.selectedOptions }
        console.log("Inside submitQuiz", this.selectedOptions);
        await fetch("https://adgrecruitments.herokuapp.com/user/management/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("Token"),
            },
            body: JSON.stringify(this.selectedOptions),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error.message);
        })
        // this.setState({
        //     inputValue: ""
        // })
    }

    // optionsArray = ["a", "b", "c", "d"];

    setResponsesArray(qid, event) {
        console.log("Qid", qid);
        console.log("Event", event.target.value);
        // this.inputValue.push({qid: qid, response: event.target.value})
        // this.inputValue[this.state.currentQuestionIndex] = event.target.value
        // this.responsesArray.push({qid: qid, response: event.target.value});
        // console.log("Hello", this.responsesArray)
        // console.log(qid,this.optionsArray[response]);
        if(this.responsesArray.some(option=> option.qid === qid)){
            for(let i=0;i<this.responsesArray.length;i++){
                if(this.responsesArray[i].qid === qid){
                    console.log("okay match");
                    this.responsesArray[i].response = event.target.value;
                }
            }
        } 
        else {
            this.responsesArray.push({qid:qid,response:event.target.value})
        }
        this.setState({
            inputValue: this.state.inputValue.concat(this.responsesArray[this.state.currentQuestionIndex].response)
        })
        console.log("inside setSelectedOption",this.responsesArray);
    }

    gotoNextQuestion() {
        if(this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                // inputValue: this.responsesArray[this.state.currentQuestionIndex]['response']
            })
            // this.inputValue[this.state.currentQuestionIndex] = this.responsesArray[this.state.currentQuestionIndex].response;
        } else
            return
    }

    gotoPreviousQuestion() {
        if(this.state.currentQuestionIndex > 0) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex - 1,
                // inputValue: this.responsesArray[this.state.currentQuestionIndex]['response']
            })
            // this.inputValue[this.state.currentQuestionIndex] = this.responsesArray[this.state.currentQuestionIndex].response;
        } else
            return
    }

    componentDidMount() {
        this.getQuizQuestions();
        // console.log(this.state.quizQuestions);
        this.getTimer();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.time > 0 && prevState.currentQuestionIndex === this.state.currentQuestionIndex)
            this.getTimer();
    }

    componentWillUnmount() {
        this.submitQuiz();
    }

    render() {
        if(!sessionStorage.getItem("Token")) {
            return(
                <Redirect to="/" />
            )
        }
        else if(this.state.time === 0) {
            return(
                <Redirect to="/thank-you" />
            )
        }
        return(
            <Background>
                { this.state.quizQuestions.length === 0 ?
                    <div className="loading">Loading...</div> :
                    <>
                        <div className="heading">Management Quiz</div>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Question {this.state.currentQuestionIndex + 1}</span>/{this.state.quizQuestions.length}
                            </div>
                            <div className="question-text">
                                {this.state.quizQuestions[this.state.currentQuestionIndex].description}
                            </div>
                            <div className='answer-section'>
                                {/* <textarea className="mgmt-answer"
                                          value={ this.state.value }
                                          onChange={ (e) => { this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, e) } }></textarea> */}
                                <textarea
                                       className="mgmt-answer"
                                       placeholder="Enter your answer..."
                                       value={ this.state.inputValue[this.state.currentQuestionIndex] }
                                       onChange={ (e) => { this.setResponsesArray(this.state.quizQuestions[this.state.currentQuestionIndex]._id, e) } } />
                                {/* {Object.keys(this.state.quizQuestions[this.state.currentQuestionIndex].options).map((key, index) => {
                                    return (
                                        <div key={index} onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id,index)}>
                                            <button className="options"
                                                    value={this.optionsArray[index]}>
                                                    {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                            </button>
                                        </div>
                                    )
                                })} */}
                            </div>
                            <div className='btn-bottom'>
                                {this.state.currentQuestionIndex === 0 ?
                                    <button disabled={ true } id="disabled-btn">Previous</button> :
                                    <button onClick={ () => { this.gotoPreviousQuestion() } }>Previous</button>
                                }
                                {/* <button className={ submitButton } onCLick={ () => { this.showModal1() } }>Submit</button> */}
                                {this.state.currentQuestionIndex === 4 ? 
                                    <button onClick={ () => { this.showModal1() } }>Submit</button> :
                                    <button onClick={ () => { this.gotoNextQuestion() } }>Next</button>
                                }
                                <Modal show={this.state.showModal} onHide={this.hideModal} submitQuiz={ this.submitQuiz } />
                            </div>
                            <div className="timer">
                                <Timer time={this.state.time} />
                            </div>
                            {/* <div>
                                <button onClick={ () => { this.submitQuiz } }>Submit</button>
                            </div> */}
                        </div>
                    </>
                }
            </Background>
        )
    }
}

export default MgmtQuiz;
