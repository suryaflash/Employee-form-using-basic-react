import React, { Component } from 'react';
import './App.css';
import Add from './components/add';
import all from './components/all';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class App extends React.Component
{
  render() {
    return (
        <div>
         <Router>
            <div>
              <Route exact path="/" component={Add}/>
              <Route exact path="/all" component={all}/>
              <Route path="/add/:id" component={Add}/> 
            </div>
          </Router>
        </div>
    ) ; 
  }
}
