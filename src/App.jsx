import React from 'react';
import './App.css';
import ChessTest from './components/ChessTest';
import { Navigate, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage/MenuPage';
import GamePage from './pages/GamePage/GamePage';

function App() {
  
  return (
    <>
      {/* <ChessTest />     */}
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/game-page" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </>
  )
}

export default App
