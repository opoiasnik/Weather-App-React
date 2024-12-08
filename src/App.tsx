// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:city" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
