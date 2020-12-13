import "./App.css";
import Landing from "./components/Forms/Landing/Landing";
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import DomainPage from "./components/Forms/Domain&Instructions/DomainPage.jsx";
import Instructions from "./components/Forms/Domain&Instructions/Instructions";
import { Route, withRouter } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Admin from "./containers/Admin/Admin";

import React, { Component } from "react";

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
      <div className='App'>
        {this.state.Token ? (
          <Route path='/' exact component={DomainPage} />
        ) : (
          <Route path='/' exact component={Landing} />
        )}

        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/selection' component={DomainPage} />
        <Route path='/instructions' component={Instructions} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/admin' component={Admin} />
      </div>
    );
  }
}

export default withRouter(App);
