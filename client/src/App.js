import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import axios from 'axios';
import Login from "./components/Login";
import "./styles.scss";

function App() {

axios.get('http://localhost:5000/api')
.then(response => console.log(response))
.catch(error => console.log('no get', error))

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path='/bubblepage' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
