import React from "react";
import "./Quiz.css";
import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";

class TechQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            quizQuestions: [],
            time: 600,
            currentQuestionIndex: 0,
            selectedOptions: [],
            questionId: []
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
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
        const quizResponse = {qid: this.state.questionId, response: this.state.selectedOptions }
        console.log(quizResponse);
        await fetch("https://adgrecruitments.herokuapp.com/user/technical/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("Token"),
            },
            body: JSON.stringify(quizResponse),
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

    setSelectedOption(id,index) {
        // console.log(id,this.optionsArray[index]);
        if(this.selectedOptions.some(option=> option.id ===id)){
            for(let i=0;i<this.selectedOptions.length;i++){
                if(this.selectedOptions[i].id===id){
                    console.log("okay match");
                    this.selectedOptions[i].index=this.optionsArray[index];
                }
            }
        } else {
            this.selectedOptions.push({id:id,index:this.optionsArray[index]})
        }
        console.log("hello",this.selectedOptions);
    }

    gotoNextQuestion() {
        if(this.state.currentQuestionIndex < this.state.quizQuestions.length - 1)
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
            })
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
    }

    render() {
        if(!sessionStorage.getItem("Token")) {
            return(
                <Redirect to="/" />
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
                                        <div key={index}>
                                            <button className="options"
                                                    onCLick={ () => { this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id, key) } }
                                                    value={this.optionsArray[index]}>
                                                        {/* {console.log(quizQuestions)} */}
                                                    {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='btn-bottom'>
                                <button onClick={ () => { this.gotoPreviousQuestion() } }>Previous</button>
                                <button onCLick={ () => { this.submitQuiz() } }>Submit</button>
                                <button onClick={ () => { this.gotoNextQuestion() } }>Next</button>
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
