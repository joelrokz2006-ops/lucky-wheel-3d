const test = require('node:test');
const assert = require('node:assert');
const { generateResult, WHEEL_SECTORS, MIN_BET, MAX_BET } = require('../utils/generateResult');

test('generateResult returns valid sector object', () => {
  const result = generateResult();
  assert.ok(typeof result.index === 'number');
  assert.ok(result.index >= 0 && result.index < WHEEL_SECTORS.length);
  assert.ok(typeof result.label === 'string');
  assert.ok(typeof result.multiplier === 'number');
  assert.strictEqual(WHEEL_SECTORS[result.index].multiplier, result.multiplier);
});

test('Wheel sectors match specification', () => {
  assert.strictEqual(WHEEL_SECTORS.length, 8);
  assert.strictEqual(WHEEL_SECTORS[0].multiplier, 0);
  assert.strictEqual(WHEEL_SECTORS[1].multiplier, 1);
  assert.strictEqual(WHEEL_SECTORS[2].multiplier, 0);
  assert.strictEqual(WHEEL_SECTORS[3].multiplier, 2);
  assert.strictEqual(WHEEL_SECTORS[4].multiplier, 0);
  assert.strictEqual(WHEEL_SECTORS[5].multiplier, 3);
  assert.strictEqual(WHEEL_SECTORS[6].multiplier, 0);
  assert.strictEqual(WHEEL_SECTORS[7].multiplier, 10);
});

test('Bet limits match specification', () => {
  assert.strictEqual(MIN_BET, 10);
  assert.strictEqual(MAX_BET, 100);
});

test('generateResult distributes results across all sectors over multiple iterations', () => {
  const counts = new Array(WHEEL_SECTORS.length).fill(0);
  for (let i = 0; i < 1000; i++) {
    const res = generateResult();
    counts[res.index]++;
  }
  // Each sector should be hit at least once in 1000 iterations
  for (let i = 0; i < WHEEL_SECTORS.length; i++) {
    assert.ok(counts[i] > 0, `Sector ${i} was never selected`);
  }
});
