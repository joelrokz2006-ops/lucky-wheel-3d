import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/GameHistory.css';

const GameHistory = () => {
  const { gameHistory } = useGame();

  return (
    <div className="history-hud-card">
      <div className="history-header">
        <div className="history-title-wrap">
          <span className="history-icon">📜</span>
          <h3 className="history-title">RECENT SPINS LOG</h3>
        </div>
        <span className="history-count-badge">{gameHistory.length} Recorded</span>
      </div>

      {gameHistory.length === 0 ? (
        <div className="no-history-box">
          <span className="no-history-icon">🎰</span>
          <p>No spins recorded yet this session. Choose a bet and hit Spin!</p>
        </div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>WAGER</th>
                <th>MULTIPLIER</th>
                <th>REWARD</th>
                <th>NET PROFIT</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((item, idx) => {
                const isWin = item.reward > 0;
                const net = item.reward - item.betAmount;
                const timeStr = item.createdAt
                  ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                  : 'Just now';

                return (
                  <tr key={idx} className={isWin ? 'row-win' : 'row-lose'}>
                    <td className="col-bet">🪙 {item.betAmount}</td>
                    <td className="col-mult">
                      <span className={`mult-pill ${item.multiplier === 10 ? 'pill-jackpot' : isWin ? 'pill-win' : 'pill-lose'}`}>
                        {item.multiplier}x
                      </span>
                    </td>
                    <td className={`col-reward ${isWin ? 'text-win' : 'text-lose'}`}>
                      {isWin ? `+${item.reward.toLocaleString()} CR` : '0 CR'}
                    </td>
                    <td className={`col-net ${net > 0 ? 'text-win' : net < 0 ? 'text-lose' : ''}`}>
                      {net > 0 ? `+${net.toLocaleString()}` : net < 0 ? `${net.toLocaleString()}` : '0'} CR
                    </td>
                    <td className="col-time">{timeStr}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameHistory;
