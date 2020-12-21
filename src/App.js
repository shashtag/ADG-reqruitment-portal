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
        <Route path='https://test.adgvit.com/signup' component={SignUp} />
        <Route path='https://test.adgvit.com/login' component={Login} />
        <Route
          path='https://test.adgvit.com/forgotPassword'
          component={ForgotPassword}
        />
        <Route
          path='https://test.adgvit.com/selection'
          component={DomainPage}
        />
        <Route
          path='https://test.adgvit.com/instructions'
          component={Instructions}
        />
        {/* <Route path="/quiz" component={Quiz} /> */}
        <Route path='https://test.adgvit.com/Technical' component={TechQuiz} />
        <Route path='https://test.adgvit.com/Management' component={MgmtQuiz} />
        <Route path='https://test.adgvit.com/Design' component={DesignQuiz} />
        <Route path='https://test.adgvit.com/thank-you' component={ThankYou} />
      </div>
    );
  }
}

export default withRouter(App);
