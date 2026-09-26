import React from 'react';
import { useGame } from '../context/GameContext';
import { soundManager } from '../utils/soundEffects';
import '../styles/BetSelector.css';

const BET_CHIPS = [
  { amount: 10, label: '10', color: '#0284c7', bgClass: 'chip-blue' },
  { amount: 20, label: '20', color: '#10b981', bgClass: 'chip-green' },
  { amount: 50, label: '50', color: '#8b5cf6', bgClass: 'chip-purple' },
  { amount: 100, label: '100', color: '#f59e0b', bgClass: 'chip-gold' }
];

const BetSelector = () => {
  const { selectedBet, setSelectedBet, gameState } = useGame();
  const isSpinning = gameState === 'SPINNING' || gameState === 'REQUESTING_RESULT';

  const handleSelect = (amount) => {
    if (!isSpinning) {
      soundManager.playClick();
      setSelectedBet(amount);
    }
  };

  return (
    <div className="bet-selector-container">
      <div className="bet-header">
        <span className="bet-title">SELECT WAGER</span>
        <span className="bet-current-badge">Selected: 🪙 {selectedBet} Credits</span>
      </div>

      <div className="chips-grid">
        {BET_CHIPS.map((chip) => {
          const isSelected = selectedBet === chip.amount;
          return (
            <button
              key={chip.amount}
              className={`casino-chip ${chip.bgClass} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(chip.amount)}
              disabled={isSpinning}
            >
              <div className="chip-inner">
                <span className="chip-val">{chip.label}</span>
                <span className="chip-sub">CR</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BetSelector;
