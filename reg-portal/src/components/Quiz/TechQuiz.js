import React, { useState } from "react";
import { useEffect } from "react";
import "./Quiz.css";
import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import { Redirect } from "react-router-dom";

const TechQuiz = (props) => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    let [currentQuestion, setCurrentQuestion] = useState(0);
    let questions=[];
    let [time, setTime] = useState(600);
    useEffect(() => {
        if (time > 0) {
          setTimeout(() => {
            setTime(--time);
          }, 1000);
        }
      });
      function displayQuestion(descrip,options){
        // setQuestions((prevQ)=>{
        //     return [...prevQ,{questionDescription:descrip}]
        // });
        var q={descrip:descrip,options:options}
        questions.push(q);
        questions.forEach(q=>{
            console.log("Description",q.descrip);
            let opt=q.options;
            Object.keys(opt).map((index)=>{
                console.log("OPTION:",index,opt[index]);
            })
        })
      }
    // useEffect(() => {
    //         getQuizQuestions();
    // });
    if(!sessionStorage.getItem("Token")) {
        return(
            <Redirect to="/" />
        )
    }

    function getQuizQuestions() {
        console.log("val");
        fetch("https://adgrecruitments.herokuapp.com/questions/technical/get-quiz-questions/1/web", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("Token"),
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            setQuizQuestions(data);
            quizQuestions.map(prevQ=>{
                displayQuestion(prevQ.questionDescription,prevQ.options);
            })
        })
        .catch((error) => {
            console.log(error);
            alert("Error in fetching quiz questions!");
        })
    }
    
    if (questions.length>0) {
        return (
          <Background>
                  <div className='question-section'>
                    <div className='question-count'>
                      <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className='question-text'>
                      {questions[currentQuestion].descrip}
                    </div>
                  </div>
                  <div className='answer-section'>
                      {Object.keys(questions.options).map(index=>{
                          <button className='options'>{questions.options[index]}
                        </button>
                      })}
                    <div className='btn-bottom'>
                      <button>Previous</button>
                      <Timer time={time} />
                      <button>Next</button>
                    </div>
                  </div>
          </Background>
        );
      } else {
        return <Background>loading...
            <button onClick={()=> getQuizQuestions() }>Get</button>
        </Background>;
      }
}

export default TechQuiz;