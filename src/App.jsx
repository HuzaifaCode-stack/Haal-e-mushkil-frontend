// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'

import Grievance from './pages/grievance';
import Feedback from './pages/feedback';
import Volunteer from './pages/volunteer';
import Voting from './pages/voting';

const App = () => {
  return (
    <Router>
      <div className="bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<Grievance />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/voting" element={<Voting />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
