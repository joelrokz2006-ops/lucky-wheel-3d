import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { balance, soundEnabled, toggleSound } = useGame();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎡</span>
          <span className="logo-text">LUCKY<span className="logo-accent">WHEEL</span> <span className="badge-3d">3D</span></span>
        </Link>

        {/* Center Navigation */}
        <nav className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/game"
            className={`nav-link ${location.pathname === '/game' ? 'active' : ''}`}
          >
            Play Game
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="navbar-actions">
          {/* Sound Toggle */}
          <button
            className="sound-toggle-btn"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Balance Pill */}
          <div className="navbar-wallet-pill">
            <span className="coin-icon">🪙</span>
            <span className="balance-val">{balance.toLocaleString()}</span>
            <span className="balance-unit">CR</span>
          </div>

          {/* User Auth */}
          {user ? (
            <div className="user-profile-badge">
              <span className="user-name">👤 {user.name || 'Player'}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="login-link">
                Sign In
              </Link>
              <Link to="/register" className="register-glow-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
