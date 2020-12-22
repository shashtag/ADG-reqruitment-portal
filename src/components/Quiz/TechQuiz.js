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
        this.state =  {
            quizQuestions: [],
            time: 600,
            currentQuestionIndex: 0,
            questionId: [],
            black: true,
            showModal:false
        };
        this.submitQuiz = this.submitQuiz.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.showModal1 = this.showModal1.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(e) {
        // if(this.selectedOptions[this.state.currentQuestionIndex].response === e.target.value)
        this.setState({
            black: !this.state.black
        })
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
        await fetch("https://adgrecruitments.herokuapp.com/questions/technical/get-quiz-questions/1/web", {
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
        await fetch("https://adgrecruitments.herokuapp.com/user/technical/submit", {
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
    }

    optionsArray = ["a", "b", "c", "d"];

    setSelectedOption(qid, response) {
        // console.log(qid,this.optionsArray[response]);
        if(this.selectedOptions.some(option=> option.qid === qid)){
            for(let i=0;i<this.selectedOptions.length;i++){
                if(this.selectedOptions[i].qid === qid){
                    console.log("okay match");
                    this.selectedOptions[i].response=this.optionsArray[response];
                }
            }
        } else {
            this.selectedOptions.push({qid:qid,response:this.optionsArray[response]})
        }
        console.log("inside setSelectedOption",this.selectedOptions);
    }

    gotoNextQuestion() {
        if(this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
            })
            // if(this.state.currentQuestionIndex === 9)
            //     this.setState({
            //         nextBtn: "Submit"
            //     })
        }
        else
            return
    }

    gotoPreviousQuestion() {
        if(this.state.currentQuestionIndex > 0)
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex - 1
            })
        else
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
        // if(prevState.time > 0)
        //     this.getTimer();
    }

    componentWillUnmount() {
        this.submitQuiz();
    }

    render() {
        let btnClass = this.state.black ? "blackButton" : "blueButton";

        if(!sessionStorage.getItem("Token")) {
            return(
                <Redirect to="/" />
            )
        }
        else if(this.state.time === 0) {
            return(
                <Redirect to="thank-you" />
            )
        }
        return(
            <Background>
                { this.state.quizQuestions.length === 0 ?
                    <div className="loading">Loading...</div> :
                    <>
                        <div className="heading">Technical Quiz</div>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Question {this.state.currentQuestionIndex + 1}</span>/{this.state.quizQuestions.length}
                            </div>
                            <div className="question-text">
                                {this.state.quizQuestions[this.state.currentQuestionIndex].questionDescription}
                            </div>
                            <div className='answer-section'>
                                {Object.keys(this.state.quizQuestions[this.state.currentQuestionIndex].options).map((key, index) => {
                                    return (
                                        <div key={index} onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id,index)}>
                                            <button className={ btnClass }
                                                    onClick={ this.changeColor }
                                                    value={this.optionsArray[index]}>
                                                    {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                            </button>
                                        </div>
                                    )
                                })}
                                {/* <div onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, 0)}>
                                    <button className={ btnClass }
                                        onClick={ this.changeColor }
                                        value={this.optionsArray[0]}>
                                        {this.optionsArray[0]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[0]}
                                    </button>
                                </div>
                                <div onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, 1)}>
                                    <button className={ btnClass }
                                        onClick={ this.changeColor }
                                        value={this.optionsArray[1]}>
                                        {this.optionsArray[1]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[1]}
                                    </button>
                                </div>
                                <div onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, 2)}>
                                    <button className={ btnClass }
                                        onClick={ this.changeColor }
                                        value={this.optionsArray[2]}>
                                        {this.optionsArray[2]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[2]}
                                    </button>
                                </div>
                                <div onClick={()=>this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, 3)}>
                                    <button className={ btnClass }
                                        onClick={ this.changeColor }
                                        value={this.optionsArray[3]}>
                                        {this.optionsArray[3]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[3]}
                                    </button>
                                </div> */}
                            </div>
                            <div className='btn-bottom'>
                                {this.state.currentQuestionIndex === 0 ?
                                    <button disabled={ true } id="disabled-btn">Previous</button> :
                                    <button onClick={ () => { this.gotoPreviousQuestion() } }>Previous</button>
                                }
                                {/* <button className={ submitButton } onCLick={ () => { this.showModal1() } }>Submit</button> */}
                                {this.state.currentQuestionIndex === 9 ? 
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

export default TechQuiz;
