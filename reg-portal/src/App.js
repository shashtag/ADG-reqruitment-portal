import './App.css';
import Landing from './components/Forms/Landing/Landing';
import SignUp from "./components/Forms/SignUp/SignUp";
import Login from "./components/Forms/SignUp/Login/Login";
import DomainPage from "./components/Forms/Domain&Instructions/DomainPage.jsx";
import Instructions from './components/Forms/Domain&Instructions/Instructions';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Admin from './containers/Admin/Admin';
import AdminLogin from './containers/Login/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={ Landing } />
        <Route path="/signup" component={ SignUp } />
        <Route path="/login" component={ Login } />
        <Route path="/selection" component={ DomainPage } />
        <Route path="/instructions" component={ Instructions } />
        <Route path="/quiz" component={ Quiz } />
        <Route path="/admin" component={ Admin } />
        <Route path="/admin-login" component={ AdminLogin } />
      </Router>
    </div>
  );
}

export default App;
