import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { soundManager } from '../utils/soundEffects';

const GameContext = createContext();

const WHEEL_SECTORS = [
  { index: 0, label: '0x', multiplier: 0 },
  { index: 1, label: '1x', multiplier: 1 },
  { index: 2, label: '0x', multiplier: 0 },
  { index: 3, label: '2x', multiplier: 2 },
  { index: 4, label: '0x', multiplier: 0 },
  { index: 5, label: '3x', multiplier: 3 },
  { index: 6, label: '0x', multiplier: 0 },
  { index: 7, label: '10x', multiplier: 10 }
];

export const GameProvider = ({ children }) => {
  const { user, updateBalance } = useAuth();
  const [balance, setBalance] = useState(() => (user && typeof user.balance === 'number' ? user.balance : 1000));
  const [selectedBet, setSelectedBet] = useState(10);
  const [gameState, setGameState] = useState('IDLE'); // IDLE, REQUESTING_RESULT, SPINNING, RESULT, ERROR
  const [targetSector, setTargetSector] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync balance with authenticated user
  useEffect(() => {
    if (user && typeof user.balance === 'number') {
      setBalance(user.balance);
    }
  }, [user]);

  // Fetch history when user changes or on mount
  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/game/history');
      if (res.data.success) {
        setGameHistory(res.data.history);
      }
    } catch (err) {
      // Backend may not be logged in or standalone
    }
  };

  const toggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
  };

  const refillCredits = () => {
    soundManager.playClick();
    const newBal = balance + 1000;
    setBalance(newBal);
    updateBalance(newBal);
  };

  const executeSpin = async () => {
    if (gameState === 'SPINNING' || gameState === 'REQUESTING_RESULT') return;

    if (balance < selectedBet) {
      setErrorMessage('Insufficient balance! Please lower your bet or refill credits.');
      soundManager.playLose();
      return;
    }

    setErrorMessage(null);
    setGameState('REQUESTING_RESULT');
    soundManager.playClick();

    try {
      // Send spin request to backend API
      const res = await api.post('/game/spin', { betAmount: selectedBet });
      
      if (res.data.success) {
        const data = res.data;
        setTargetSector(data.resultIndex);
        setLastResult(data);
        setGameState('SPINNING');
      } else {
        setErrorMessage(res.data.message || 'Spin failed.');
        setGameState('ERROR');
      }
    } catch (err) {
      // If backend is offline or unauthenticated, execute secure client demonstration
      console.warn('API error, using local fallback:', err.response?.data?.message || err.message);
      
      // Fallback local calculation for seamless UI demo
      const randomIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
      const sector = WHEEL_SECTORS[randomIndex];
      const reward = selectedBet * sector.multiplier;
      const balanceBefore = balance;
      const balanceAfter = balanceBefore - selectedBet + reward;

      const fallbackResult = {
        success: true,
        resultIndex: sector.index,
        multiplier: sector.multiplier,
        reward: reward,
        balance: balanceAfter,
        balanceBefore: balanceBefore,
        betAmount: selectedBet,
        createdAt: new Date().toISOString()
      };

      setTargetSector(sector.index);
      setLastResult(fallbackResult);
      setGameState('SPINNING');
    }
  };

  const handleSpinAnimationEnd = () => {
    if (lastResult) {
      setBalance(lastResult.balance);
      updateBalance(lastResult.balance);
      
      // Add to local history list
      setGameHistory((prev) => [lastResult, ...prev.slice(0, 19)]);
      setGameState('RESULT');

      // Play victory or lose sounds
      if (lastResult.multiplier === 10) {
        soundManager.playJackpot();
      } else if (lastResult.multiplier > 0) {
        soundManager.playWin();
      } else {
        soundManager.playLose();
      }
    }
  };

  const closeResultModal = () => {
    soundManager.playClick();
    setLastResult(null);
    setGameState('IDLE');
    setTargetSector(null);
  };

  return (
    <GameContext.Provider value={{
      balance,
      setBalance,
      selectedBet,
      setSelectedBet,
      gameState,
      setGameState,
      targetSector,
      lastResult,
      gameHistory,
      errorMessage,
      setErrorMessage,
      soundEnabled,
      toggleSound,
      executeSpin,
      handleSpinAnimationEnd,
      closeResultModal,
      refillCredits,
      fetchHistory
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
