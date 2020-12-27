import React, { useState } from "react";
import { useEffect } from "react";
import "./Quiz.css";
import Timer from "./Timer";
import Background from "../../hoc/Background/Background";
import axios from "axios";

function Quiz(props) {
  if (!sessionStorage.getItem("Token")) {
    props.history.replace("/");
  }
  // console.log(props);
  const [error, setError] = useState(null);
  const [quest, setquest] = useState(null);
  let [time, setTime] = useState(600);
  let domain = props.location.param.toLowerCase();

  const questions = [
    {
      questionText: "Which of the following is not a programming language?",
      answerOptions: [
        { answerText: "Python", isCorrect: false },
        { answerText: "C#", isCorrect: false },
        { answerText: "Anaconda", isCorrect: true },
        { answerText: "C++", isCorrect: false },
      ],
    },
    {
      questionText: "Which of the following is not a data type in python?",
      answerOptions: [
        { answerText: "int", isCorrect: false },
        { answerText: "float", isCorrect: false },
        { answerText: "Long int", isCorrect: true },
        { answerText: "complex", isCorrect: false },
      ],
    },
    {
      questionText: "Which of the following is not a DBMS?",
      answerOptions: [
        { answerText: "mySQLite", isCorrect: true },
        { answerText: "mySQL", isCorrect: false },
        { answerText: "MongoDb", isCorrect: false },
        { answerText: "Couchbase", isCorrect: false },
      ],
    },
    {
      questionText: "What is front-end web developement?",
      answerOptions: [
        {
          answerText: "Connecting the the server-side and client-side ",
          isCorrect: false,
        },
        { answerText: "Server-side developement", isCorrect: false },
        { answerText: "Developing client-side interface", isCorrect: true },
        { answerText: "None", isCorrect: false },
      ],
    },
  ];
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://adgrecruitments.herokuapp.com/questions/${domain}/get-quiz-questions/1/web`,
      headers: {
        "auth-token": sessionStorage.getItem("Token"),
      },
    };

    axios(config)
      .then(function (response) {
        setquest(response.data);
        this.props.history.push("thank-you");

      })
      .catch(function (error) {
        setError(error);
      });
  }, [props.location.param]);
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(--time);
      }, 1000);
    }
  });

  let [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  if (error) {
    return <Background>{error.message}</Background>;
  } else if (quest) {
    return (
      <Background>
        <div className='app'>
          {showScore ? (
            <div className='score-section'>
              You scored {score} out of {questions.length}
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>
                  {questions[currentQuestion].questionText}
                </div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <button
                      className='options'
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }>
                      {answerOption.answerText}
                    </button>
                  ),
                )}
                <div className='btn-bottom'>
                  <button>Previous</button>
                  <Timer time={time} />
                  <button>Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </Background>
    );
  } else {
    return <Background>loading...</Background>;
  }
}

export default Quiz;
