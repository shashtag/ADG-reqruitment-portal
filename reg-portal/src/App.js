import "./App.css";
import Landing from "./components/Forms/Landing/Landing";
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import { Route, withRouter } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import ForgotPassword from "./components/Forms/SignUp/ForgotPassword/ForgotPassword";
import DomainSelection from "./components/Quiz/Domains";
import Instructions from "./components/Quiz/Instructions";
import TechQuiz from "./components/Quiz/TechQuiz";

import React, { Component } from "react";
// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: [
//       "SF Pro Display",
//       "-apple-system",
//       "BlinkMacSystemFont",
//       "sans-serif",
//     ].join(","),
//   },
// });
export class App extends Component {
  state = {
    Token: sessionStorage.getItem("Token"),
  };
  // componentDidMount() {
  //   if (this.state.Token) {
  //     this.props.history.push("/selection");
  //   }
  // }
  render() {
    return (
      // <ThemeProvider theme={theme}>
      <div className='App'>
        {/* {this.state.Token ? (
            <Route path='/' exact component={DomainPage} />
          ) : ( */}
        <Route path='/' exact component={Landing} />
        {/* )} */}

<<<<<<< HEAD
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/selection' component={DomainPage} />
        <Route path='/instructions' component={Instructions} />
        <Route path='/quiz' component={Quiz} />
=======
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/selection" component={DomainSelection} />
        <Route path="/instructions" component={Instructions} />
        {/* <Route path="/quiz" component={Quiz} /> */}
        <Route path="/techQuiz" component={TechQuiz} />

>>>>>>> a7453eafb41349973618f6526fc33adbfef3c9f1
      </div>
      // </ThemeProvider>
    );
  }
}

export default withRouter(App);
