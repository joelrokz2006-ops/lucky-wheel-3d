import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </main>
        </div>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
