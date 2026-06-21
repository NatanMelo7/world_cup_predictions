import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Predictions from './pages/Predictions';
import Leaderboard from './pages/Leaderboard';
import { getStoredUserId } from './api';
import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getStoredUserId());
  }, []);

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <img src="/world_cup_logo.svg" alt="Copa 2026" className="nav-logo" />
        </Link>
        <div className="nav-links">
          <Link to="/palpites">Palpites</Link>
          <Link to="/ranking">Ranking</Link>
          {isLoggedIn && <Link to="/perfil">Perfil</Link>}
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/palpites" element={<Predictions />} />
          <Route path="/ranking" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}
