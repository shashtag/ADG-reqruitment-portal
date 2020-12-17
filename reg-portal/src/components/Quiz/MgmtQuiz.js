// import React, { useState, useEffect } from "react";
// import "./Quiz.css";
// import Timer from "./Timer";
// import Background from "../../hoc/Background/Background";
// import { Redirect } from "react-router-dom";

// const MgmtQuiz = (props) => {

//     if(!sessionStorage.getItem("Token")) {
//         return(
//             <Redirect to="/" />
//         )
//     }

//     const [quizQuestions, setQuizQuestions] = useState([]);

//     useEffect(() => {
//         getQuizQuestions();
//     }, []);

//     function getQuizQuestions() {
        
//         fetch("https://adgrecruitments.herokuapp.com/questions/management/get-quiz-questions/web", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": sessionStorage.getItem("Token"),
//             },
//         })
//         .then((response) => {
//             console.log(response);
//             return response.json();
//         })
//         .then((data) => {
//             setQuizQuestions(data);
//         })
//         .catch((error) => {
//             console.log(error);
//             alert("Error in fetching quiz questions!");
//         })

//         console.log(quizQuestions);
//     }

//     return(
//         <button onClick={ getQuizQuestions }>Get</button>
//     )
// }

// export default MgmtQuiz;