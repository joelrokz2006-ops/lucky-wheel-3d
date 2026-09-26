const crypto = require('crypto');

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

const MIN_BET = 10;
const MAX_BET = 100;
const INITIAL_BALANCE = 1000;

/**
 * Generates an authoritative random sector using cryptographic randomness.
 * @returns {{ index: number, label: string, multiplier: number }}
 */
const generateResult = () => {
  const randomIndex = crypto.randomInt(0, WHEEL_SECTORS.length);
  return WHEEL_SECTORS[randomIndex];
};

module.exports = {
  WHEEL_SECTORS,
  MIN_BET,
  MAX_BET,
  INITIAL_BALANCE,
  generateResult
};
