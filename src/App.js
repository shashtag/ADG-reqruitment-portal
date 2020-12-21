import "./App.css";
import Landing from "./components/Forms/Landing/Landing";
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import { Route, withRouter } from "react-router-dom";
import ForgotPassword from "./components/Forms/SignUp/ForgotPassword/ForgotPassword";
import DomainPage from "./components/Forms/Domain&Instructions/DomainPage.jsx";
import Instructions from "./components/Forms/Domain&Instructions/Instructions";
import TechQuiz from "./components/Quiz/TechQuiz";
import MgmtQuiz from "./components/Quiz/MgmtQuiz";
import DesignQuiz from "./components/Quiz/DesignQuiz";

import React, { Component } from "react";
import ThankYou from "./components/Forms/Domain&Instructions/Thankyou";
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
      <div className='App'>
        {/* {this.state.Token ? (
            <Route path='/' exact component={DomainPage} />
          ) : ( */}
        <Route path='/' exact component={Landing} />
        {/* )} */}
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/selection' component={DomainPage} />
        <Route path='/instructions' component={Instructions} />
        {/* <Route path="/quiz" component={Quiz} /> */}
        <Route path='/Technical' component={TechQuiz} />
        <Route path='/Management' component={MgmtQuiz} />
        <Route path='/Design' component={DesignQuiz} />
        <Route path="/thank-you" component={ThankYou} />
      </div>
    );
  }
}

export default withRouter(App);
