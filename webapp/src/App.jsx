import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import './assets/css/master.css';

const App = () => {
  return (
    <Router>      
      <Route exact path="/" component={Login} />      
      <Route exact path="/dev/:id" component={Main} />  
      {/* <Route path="**" component ={Login} />     */}
    </Router>
  );
};

export default App;