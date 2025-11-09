import { simpleCalculator, Action } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Subtract
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 1, b: -2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 0, action: Action.Subtract, expected: 2 },
  // Multiply
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  // Divide
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 0, action: Action.Divide, expected: Infinity },
  { a: 6, b: -2, action: Action.Divide, expected: -3 },
  { a: 1, b: 3, action: Action.Divide, expected: 1 / 3 },
  { a: 1, b: 5, action: Action.Divide, expected: 0.2 },
  // Exponentiate
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25 },
  // Invalid action
  { a: 2, b: 1, action: 'divide', expected: null },
  { a: 2, b: 1, action: 'abc', expected: null },
  // Invalid arguments
  { a: 1, b: 'b', action: Action.Add, expected: null },
  { a: 1, b: null, action: Action.Add, expected: null },
  { a: undefined, b: 2, action: Action.Add, expected: null },
  { a: 3, b: [], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for case $a $b and action "$action"',
    ({ a, b, action, expected }) => {
      expect(
        simpleCalculator({
          a: a,
          b: b,
          action: action,
        }),
      ).toBe(expected);
    },
  );

  // alternative solution with loop
  // testCases.forEach((item, index) => {
  //   test(`should return ${item.expected} for case ${index}`, () => {
  //     expect(
  //       simpleCalculator({
  //         a: item.a,
  //         b: item.b,
  //         action: item.action,
  //       }),
  //     ).toBe(item.expected);
  //   });
  // });
});
