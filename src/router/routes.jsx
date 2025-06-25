// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About';
import GrievanceCell from './pages/GrievanceCell';
import YouthForum from './pages/YouthForum';

const App = () => {
  return (
    <Router>
      <div className="bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/grievance" element={<GrievanceCell />} />
          <Route path="/youth" element={<YouthForum />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
