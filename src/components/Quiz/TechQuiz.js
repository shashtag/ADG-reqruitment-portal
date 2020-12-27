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
            currentQuestionIndex: 0,
            questionId: [],
            // black: true,
            finalResponse: [],
            optionsIndex1: ["d", "d", "d", "e", "e", "e", "e", "e", "e", "e"],
            optionsIndex: ["9", "9", "9", "9", "9", "9", "9", "9", "9", "9"],
            showModal:false
        };
        this.submitQuiz = this.submitQuiz.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
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
            this.generateResponse();
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    async submitQuiz() {
        // const quizResponse = {qid: this.state.questionId, response: this.state.selectedOptions }
        // console.log("Inside submitQuiz", this.selectedOptions);
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
            // console.log(data);
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    optionsArray = ["a", "b", "c", "d"];

    setSelectedOption(qid, response, e) {
        console.log("A");
        // var res = [...this.state.optionsIndex1];
        // res[this.state.currentQuestionIndex] = this.optionsArray[response];        
        // // var currentOption = this.optionsArray[response];
        // this.setState({
        //     optionsIndex1: res
        // })
        // if(this.selectedOptions.some(option=> option.qid === qid)){
        //     for(let i=0;i<this.selectedOptions.length;i++){
        //         if(this.selectedOptions[i].qid === qid){
        //             this.selectedOptions[i].response=this.optionsArray[response];
        //             this.setState({
        //                 optionsIndex: res
        //             })
        //         }
        //     }
        // } else {
        //     this.selectedOptions.push({qid:qid,response:this.optionsArray[response]});
        //     this.setState({
        //         optionsIndex: res
        //     })
        // }
        // console.log(this.state.optionsIndex1);
        // // if(this.selectedOptions[this.state.currentQuestionIndex].response === e.target.value)
        // //     this.setState({
        // //         black: !this.state.black
        // // })
    }

    getResponse() {
        return this.state.finalResponse[this.state.currentQuestionIndex]
        // this.state.finalResponse.forEach(question => {
        //     // console.log(question.qid, this.state.quizQuestions[this.state.currentQuestionIndex]._id);
        //     if(question.qid === this.state.quizQuestions[this.state.currentQuestionIndex]._id) {
        //         // console.log(question.response);
        //         return question.response
        //     }
        // })
        // console.log(this.state.finalResponse);
    }

    updateOption(qid, index, e) {
        this.state.finalResponse.forEach(question => {
            if(question.qid === qid) {
                question.response = this.optionsArray[index];
            }
        })
        console.log(this.state.finalResponse);
    }

    generateResponse() {
        this.state.quizQuestions.forEach(question => {
            var temp = {
                qid: question._id,
                response: "e"
            }
            this.state.finalResponse.push(temp);
        })
        console.log(this.state.finalResponse);
    }

    async returnQuestionID() {
        return this.state.quizQuestions[this.state.currentQuestionIndex]._id
    }

    gotoNextQuestion() {
        if(this.state.currentQuestionIndex < this.state.quizQuestions.length - 1) {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
            })
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
        return(
            <Background>
                { this.state.finalResponse.length === 0 ?
                    <div className="loading">Loading...</div> :
                    <>
                        <div className="heading">Technical Quiz</div>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Question {this.state.currentQuestionIndex + 1}</span>/{this.state.quizQuestions.length}
                            </div>
                            <div className="question-text sub-heading">
                                {this.state.quizQuestions[this.state.currentQuestionIndex].questionDescription}
                            </div>
                            <div className='answer-section'>
                                {Object.keys(this.state.quizQuestions[this.state.currentQuestionIndex].options).map((key, index) => {
                                    // if(this.state.finalResponse[this.state.currentQuestionIndex].response === "e" && this.state.finalResponse.length > 0) {
                                    //     return (
                                    //         <div key={index} onClick={(e)=>{this.updateOption(this.returnQuestionID(), index, e)}}>
                                    //             <button className="blackButton"
                                    //                 value={this.optionsArray[index]}>
                                    //                 {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                    //             </button>
                                    //         </div>
                                    //     )
                                    // }
                                    // else {
                                    //     if(this.state.finalResponse[this.state.currentQuestionIndex].response === this.optionsArray[index] && this.state.finalResponse.length > 0)
                                    //         return (
                                    //             <div key={index} onClick={(e)=>{this.updateOption(this.returnQuestionID(), index, e)}}>
                                    //                 <button className="blueButton"
                                    //                         value={this.optionsArray[index]}>
                                    //                         {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                    //                 </button>
                                    //             </div>
                                    //         )
                                        // else
                                    // if()
                                            return (
                                                // this.getResponse(this.returnQuestionID())
                                                <div key={index} onClick={(e)=>{this.updateOption(this.returnQuestionID(), index, e)}}>
                                                    {/* {a = await this.returnQuestionID()} */}
                                                    {console.log(this.getResponse())}
                                                    {console.log(this.state.currentQuestionIndex)}
                                                    <button className="blackButton"
                                                            value={this.optionsArray[index]}>
                                                            {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                                    </button>
                                                </div>
                                            )
                                    }
                                //     else
                                //         return (
                                //             <div key={index} onClick={(e)=>{this.setSelectedOption(this.state.quizQuestions[this.state.currentQuestionIndex]._id,index,e)}}>
                                //                 <button className="blackButton"
                                //                         value={this.optionsArray[index]}>
                                //                         {this.optionsArray[index]}. {this.state.quizQuestions[this.state.currentQuestionIndex].options[key]}
                                //                 </button>
                                //             </div>
                                //         )
                                // }
                                )}
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
                                <Timer />
                            </div>
                        </div>
                    </>
                }
            </Background>
        )
    }
}

export default TechQuiz;