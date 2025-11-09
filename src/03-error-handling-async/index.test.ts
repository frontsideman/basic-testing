import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('test')).toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('test')).toThrow('test');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', () => {
    expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('MyAwesomeError', () => {
  const error = new MyAwesomeError();

  test('should be an instance of Error', () => {
    expect(error).toBeInstanceOf(Error);
  });

  test('should have a message', () => {
    expect(error.message).toBe('This is my awesome custom error!');
  });
});
