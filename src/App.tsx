// src/App.tsx
import React from 'react';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
