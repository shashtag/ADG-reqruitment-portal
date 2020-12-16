import "./App.css";
import Landing from "./components/Forms/Landing/Landing";
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import DomainPage from "./components/Forms/Domain&Instructions/DomainPage.jsx";
import Instructions from "./components/Forms/Domain&Instructions/Instructions";
import { Route, withRouter } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";

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
    Token: localStorage.getItem("Token"),
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

          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/selection' component={DomainPage} />
          <Route path='/instructions' component={Instructions} />
          <Route path='/quiz' component={Quiz} />
        </div>
      // </ThemeProvider>
    );
  }
}

export default withRouter(App);
