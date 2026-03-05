import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelLanding from './pages/HotelLanding';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel" element={<HotelLanding />} />
        <Route path="/reception-ai" element={<HotelLanding />} />
      </Routes>
    </Router>
  );
};

export default App;

