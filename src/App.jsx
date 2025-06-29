// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Grievance from "./pages/grievance";
import Volunteer from "./pages/volunteer";
import Voting from "./pages/voting";
import Policy from "./pages/policies";
import Event from "./pages/events";

const App = () => {
  return (
    <Router>
      <div className="bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<Grievance />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/policies" element={<Policy />} />
          <Route path="/events" element={<Event />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
