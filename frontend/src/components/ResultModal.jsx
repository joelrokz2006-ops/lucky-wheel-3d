import React from 'react';
import '../styles/ResultModal.css';

const ResultModal = ({ result, onClose }) => {
  if (!result) return null;

  const isWin = result.reward > 0;
  const isJackpot = result.multiplier === 10;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-card ${isJackpot ? 'jackpot-card' : isWin ? 'win-card' : 'lose-card'}`} onClick={(e) => e.stopPropagation()}>
        {/* Confetti / Burst Embers for Wins */}
        {isWin && (
          <div className="celebration-particles">
            <span className="particle p1">✨</span>
            <span className="particle p2">🎉</span>
            <span className="particle p3">🌟</span>
            <span className="particle p4">💎</span>
            <span className="particle p5">✨</span>
            <span className="particle p6">🪙</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="modal-header">
          <span className="modal-status-badge">
            {isJackpot ? '💥 JACKPOT HIT! 💥' : isWin ? '🎉 BIG WINNER!' : '😢 SPIN RESULT'}
          </span>
          <h2 className="modal-heading">
            {isJackpot
              ? '10X MEGA MULTIPLIER!'
              : isWin
              ? `YOU WON ${result.reward.toLocaleString()} CREDITS!`
              : 'Better Luck Next Spin!'}
          </h2>
        </div>

        {/* Multiplier Showcase */}
        <div className="modal-multiplier-showcase">
          <div className="multiplier-badge-large">
            <span className="mult-number">{result.multiplier}x</span>
            <span className="mult-text">MULTIPLIER</span>
          </div>
        </div>

        {/* Result Stats Grid */}
        <div className="modal-stats-grid">
          <div className="modal-stat-box">
            <span className="stat-box-label">Wagered</span>
            <span className="stat-box-val">{result.betAmount} CR</span>
          </div>
          <div className="modal-stat-box">
            <span className="stat-box-label">Reward</span>
            <span className={`stat-box-val ${isWin ? 'stat-win' : 'stat-lose'}`}>
              {result.reward > 0 ? `+${result.reward.toLocaleString()}` : '0'} CR
            </span>
          </div>
          <div className="modal-stat-box">
            <span className="stat-box-label">New Balance</span>
            <span className="stat-box-val stat-accent">{result.balance.toLocaleString()} CR</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="modal-action-button" onClick={onClose}>
          {isWin ? '🎰 SPIN AGAIN' : 'TRY AGAIN'}
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
