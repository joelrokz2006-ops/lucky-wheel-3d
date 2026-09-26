import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/SpinButton.css';

const SpinButton = () => {
  const { gameState, executeSpin } = useGame();
  const isSpinning = gameState === 'SPINNING' || gameState === 'REQUESTING_RESULT';

  return (
    <div className="spin-button-wrapper">
      <div className={`spin-button-aura ${isSpinning ? 'spinning' : ''}`}></div>
      <button
        className={`spin-arcade-button ${isSpinning ? 'disabled-spinning' : ''}`}
        onClick={executeSpin}
        disabled={isSpinning}
      >
        <span className="spin-btn-icon">{isSpinning ? '🌀' : '⚡'}</span>
        <span className="spin-btn-text">
          {gameState === 'REQUESTING_RESULT'
            ? 'CONNECTING...'
            : gameState === 'SPINNING'
            ? 'SPINNING WHEEL...'
            : 'SPIN FOR JACKPOT!'}
        </span>
      </button>
    </div>
  );
};

export default SpinButton;
