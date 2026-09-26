const test = require('node:test');
const assert = require('node:assert');
const memoryStore = require('../utils/memoryStore');
const { generateResult, WHEEL_SECTORS, MIN_BET, MAX_BET } = require('../utils/generateResult');

test('MemoryStore: User creation and authentication', async () => {
  const email = `test_${Date.now()}@example.com`;
  const user = await memoryStore.createUser({
    name: 'TestPlayer',
    email,
    password: 'password123',
    balance: 1000
  });

  assert.ok(user._id);
  assert.strictEqual(user.name, 'TestPlayer');
  assert.strictEqual(user.email, email);
  assert.strictEqual(user.balance, 1000);

  // Check password verification
  const isMatch = await user.matchPassword('password123');
  assert.strictEqual(isMatch, true);

  const isWrong = await user.matchPassword('wrongpass');
  assert.strictEqual(isWrong, false);

  // Lookup by email
  const found = await memoryStore.findUserByEmail(email);
  assert.strictEqual(found._id, user._id);
});

test('MemoryStore: Balance updates and game history', async () => {
  const user = await memoryStore.createUser({
    name: 'Spinner',
    email: `spin_${Date.now()}@test.com`,
    password: 'pass',
    balance: 1000
  });

  // Execute a game
  const bet = 50;
  const result = generateResult();
  const reward = bet * result.multiplier;
  const balanceAfter = 1000 - bet + reward;

  await memoryStore.updateUserBalance(user._id, balanceAfter);
  const updatedUser = await memoryStore.findUserById(user._id);
  assert.strictEqual(updatedUser.balance, balanceAfter);

  // Save game
  const game = await memoryStore.createGame({
    user: user._id,
    betAmount: bet,
    resultIndex: result.index,
    multiplier: result.multiplier,
    reward,
    balanceBefore: 1000,
    balanceAfter
  });

  assert.ok(game._id);
  assert.strictEqual(game.betAmount, 50);

  const history = await memoryStore.getGamesByUserId(user._id);
  assert.ok(history.length >= 1);
  assert.strictEqual(history[0]._id, game._id);
});

test('Game Engine: Bet boundaries and multipliers', () => {
  assert.strictEqual(MIN_BET, 10);
  assert.strictEqual(MAX_BET, 100);

  const multipliers = WHEEL_SECTORS.map(s => s.multiplier);
  assert.ok(multipliers.includes(0));
  assert.ok(multipliers.includes(1));
  assert.ok(multipliers.includes(2));
  assert.ok(multipliers.includes(3));
  assert.ok(multipliers.includes(10));
});
