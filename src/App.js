// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:slug" component={ArticlePage} />
      </Switch>
    </Router>
  );
}

export default App;
