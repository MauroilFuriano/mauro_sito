import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelLanding from './pages/HotelLanding';
import SaasLanding from './pages/SaasLanding';
import AgriEcommerceLanding from './pages/AgriEcommerceLanding';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel" element={<HotelLanding />} />
        <Route path="/reception-ai" element={<HotelLanding />} />
        <Route path="/saas" element={<SaasLanding />} />
        <Route path="/agri-ecommerce" element={<AgriEcommerceLanding />} />
      </Routes>
    </Router>
  );
};

export default App;

