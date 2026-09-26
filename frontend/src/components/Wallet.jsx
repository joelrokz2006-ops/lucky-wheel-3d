import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/Wallet.css';

const Wallet = () => {
  const { balance, refillCredits } = useGame();

  return (
    <div className="wallet-card">
      <div className="wallet-left">
        <span className="wallet-chip-icon">🪙</span>
        <div className="wallet-details">
          <span className="wallet-label">Virtual Credits</span>
          <span className="wallet-amount">{balance.toLocaleString()}</span>
        </div>
      </div>
      <button
        className="wallet-refill-btn"
        onClick={refillCredits}
        title="Refill 1,000 Free Virtual Credits"
      >
        + Refill Free Credits
      </button>
    </div>
  );
};

export default Wallet;
