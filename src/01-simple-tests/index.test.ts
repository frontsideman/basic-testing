import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: Action.Add,
      }),
    ).toBe(3);

    expect(
      simpleCalculator({
        a: 1,
        b: -2,
        action: Action.Add,
      }),
    ).toBe(-1);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 5,
        b: 1,
        action: Action.Subtract,
      }),
    ).toBe(4);

    expect(
      simpleCalculator({
        a: 5,
        b: -1,
        action: Action.Subtract,
      }),
    ).toBe(6);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Multiply,
      }),
    ).toBe(6);

    expect(
      simpleCalculator({
        a: 2,
        b: 0,
        action: Action.Multiply,
      }),
    ).toBe(0);

    expect(
      simpleCalculator({
        a: 2,
        b: -2,
        action: Action.Multiply,
      }),
    ).toBe(-4);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Divide,
      }),
    ).toBe(3);

    expect(
      simpleCalculator({
        a: 6,
        b: 0,
        action: Action.Divide,
      }),
    ).toBe(Infinity);

    expect(
      simpleCalculator({
        a: 6,
        b: -2,
        action: Action.Divide,
      }),
    ).toBe(-3);

    expect(
      simpleCalculator({
        a: 1,
        b: 3,
        action: Action.Divide,
      }),
    ).toBe(1 / 3);

    expect(
      simpleCalculator({
        a: 1,
        b: 5,
        action: Action.Divide,
      }),
    ).toBe(0.2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 4,
        action: Action.Exponentiate,
      }),
    ).toBe(16);

    expect(
      simpleCalculator({
        a: 2,
        b: 1,
        action: Action.Exponentiate,
      }),
    ).toBe(2);

    expect(
      simpleCalculator({
        a: 2,
        b: 0,
        action: Action.Exponentiate,
      }),
    ).toBe(1);

    expect(
      simpleCalculator({
        a: 0,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBe(0);

    expect(
      simpleCalculator({
        a: 2,
        b: -2,
        action: Action.Exponentiate,
      }),
    ).toBe(0.25);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 1,
        action: 'divide',
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 'b',
        action: Action.Add,
      }),
    ).toBeNull();

    expect(
      simpleCalculator({
        a: 1,
        b: null,
        action: Action.Add,
      }),
    ).toBeNull();

    expect(
      simpleCalculator({
        a: undefined,
        b: 2,
        action: Action.Add,
      }),
    ).toBeNull();

    expect(
      simpleCalculator({
        a: 3,
        b: [],
        action: Action.Add,
      }),
    ).toBeNull();
  });
});
