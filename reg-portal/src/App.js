import './App.css';
import Landing from './components/Forms/Landing/Landing';
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import SignUp2 from "./components/Forms/SignUp/SignUp2/SignUp2";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Admin from './containers/Admin/Admin';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup2" component={SignUp2} />
        <Route path="/login" component={Login} />
        <Route path = "/quiz" component = {Quiz} />
        <Route path = "/admin" component = {Admin} />
      </Router>
    </div>
  );
}

export default App;
