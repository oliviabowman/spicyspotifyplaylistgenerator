import React, { Component } from "react";
import "./App.css";
//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//pages

import PlaylistPage from "./pages/playlist";
import LoginPage from "./pages/login";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={LoginPage} /> 
        <Route exact path="/playlist" component={PlaylistPage} /> 
      </Router>
    );
  }
}

export default App;