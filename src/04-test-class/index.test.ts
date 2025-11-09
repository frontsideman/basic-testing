import { getBankAccount } from '.';
import lodash from 'lodash';

let randomMock: jest.SpyInstance;

const initialBalance = 1000;

describe('BankAccount', () => {
  let bankAccount = getBankAccount(initialBalance);
  let anotherBankAccount = getBankAccount(initialBalance);

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
    anotherBankAccount = getBankAccount(initialBalance);

    randomMock = jest.spyOn(lodash, 'random');
  });

  afterEach(() => {
    randomMock.mockRestore();
  });

  test('should create account with initial balance', () => {
    expect(bankAccount).toEqual({ _balance: initialBalance });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 1001;

    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 1001;

    expect(() =>
      bankAccount.transfer(transferAmount, anotherBankAccount),
    ).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 1001;

    expect(() => bankAccount.transfer(transferAmount, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const depositAmount = 100;
    bankAccount.deposit(depositAmount);
    const expectedBalance = initialBalance + depositAmount;

    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 100;
    bankAccount.withdraw(withdrawAmount);
    const expectedBalance = initialBalance - withdrawAmount;

    expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const transferAmount = 100;
    bankAccount.transfer(transferAmount, anotherBankAccount);
    const expectedBankAccountBalance = initialBalance - transferAmount;
    const expectedAnotherBankAccountBalance = initialBalance + transferAmount;

    expect(bankAccount.getBalance()).toBe(expectedBankAccountBalance);
    expect(anotherBankAccount.getBalance()).toBe(
      expectedAnotherBankAccountBalance,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomBalance = 1;
    const randomRequest = 1;
    randomMock
      .mockReturnValueOnce(randomBalance)
      .mockReturnValueOnce(randomRequest);
    const expectedBalance = await bankAccount.fetchBalance();

    expect(expectedBalance).toBe(randomBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const randomBalance = 100;
    const randomRequest = 1;
    randomMock
      .mockReturnValueOnce(randomBalance)
      .mockReturnValueOnce(randomRequest);
    await bankAccount.synchronizeBalance();
    const expectedBalance = bankAccount.getBalance();

    expect(expectedBalance).toBe(randomBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const randomBalance = 1;
    const randomRequest = 0;
    randomMock
      .mockReturnValueOnce(randomBalance)
      .mockReturnValueOnce(randomRequest);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
