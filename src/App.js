// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.js";
import Article from "./Article.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/article/:slug" element={<Article></Article>} />
      </Routes>
    </Router>
  );
}

export default App;
