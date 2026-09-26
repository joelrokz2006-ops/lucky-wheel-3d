import React from 'react';
import Wallet from '../components/Wallet';
import BetSelector from '../components/BetSelector';
import LuckyWheel from '../components/LuckyWheel';
import SpinButton from '../components/SpinButton';
import ResultModal from '../components/ResultModal';
import GameHistory from '../components/GameHistory';
import { useGame } from '../context/GameContext';
import '../styles/Game.css';

const Game = () => {
  const {
    targetSector,
    gameState,
    lastResult,
    errorMessage,
    setErrorMessage,
    handleSpinAnimationEnd,
    closeResultModal
  } = useGame();

  const isSpinning = gameState === 'SPINNING' || gameState === 'REQUESTING_RESULT';

  return (
    <div className="game-screen-wrapper">
      {/* Top Game Header */}
      <div className="game-hud-top">
        <div className="game-title-group">
          <h1 className="game-main-title">3D LUCKY WHEEL</h1>
          <span className="game-subtitle">SPIN TO WIN MULTIPLIERS UP TO 10X</span>
        </div>
        <Wallet />
      </div>

      {/* Error Notification Alert */}
      {errorMessage && (
        <div className="game-error-banner">
          <span>⚠️ {errorMessage}</span>
          <button className="error-close-btn" onClick={() => setErrorMessage(null)}>✕</button>
        </div>
      )}

      {/* 3D Wheel Interactive Canvas */}
      <div className="game-centerpiece">
        <LuckyWheel
          targetSector={targetSector}
          isSpinning={isSpinning}
          onSpinEnd={handleSpinAnimationEnd}
        />
      </div>

      {/* Game Betting Controls */}
      <div className="game-controls-section">
        <BetSelector />
        <SpinButton />
      </div>

      {/* Sector Multiplier Legend */}
      <div className="multipliers-legend">
        <span className="legend-label">PAYOUT SECTORS:</span>
        <div className="legend-items">
          <span className="legend-tag tag-0x">0x (No Win)</span>
          <span className="legend-tag tag-1x">1x (Push)</span>
          <span className="legend-tag tag-2x">2x (Double)</span>
          <span className="legend-tag tag-3x">3x (Triple)</span>
          <span className="legend-tag tag-10x">🔥 10x JACKPOT</span>
        </div>
      </div>

      {/* Game History Log */}
      <GameHistory />

      {/* Win / Loss Result Modal */}
      <ResultModal
        result={gameState === 'RESULT' ? lastResult : null}
        onClose={closeResultModal}
      />
    </div>
  );
};

export default Game;
