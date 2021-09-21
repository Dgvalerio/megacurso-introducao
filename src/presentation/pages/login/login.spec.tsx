/* eslint-disable import/no-extraneous-dependencies */
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { AuthenticationSpy, ValidationStub } from '../../test';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();

  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return { sut, authenticationSpy };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('should start with initial state', () => {
    const validationError = faker.random.words();
    const {
      sut: { getByTestId },
    } = makeSut({ validationError });

    const errorWrap = getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);

    const emailStatus = getByTestId('email-status');

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const {
      sut: { getByTestId },
    } = makeSut({ validationError });

    const emailInput = getByTestId('email');
    const emailStatus = getByTestId('email-status');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const {
      sut: { getByTestId },
    } = makeSut({ validationError });

    const passwordInput = getByTestId('password');
    const passwordStatus = getByTestId('password-status');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('should show valid email state if Validation succeeds', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const emailInput = getByTestId('email');
    const emailStatus = getByTestId('email-status');

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('should show valid password state if Validation succeeds', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const passwordInput = getByTestId('password');
    const passwordStatus = getByTestId('password-status');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('should enable submit button if form is valid', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const submitButton = getByTestId('submit') as HTMLButtonElement;

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(submitButton.disabled).toBe(false);
  });

  test('should show spinner on submit', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const submitButton = getByTestId('submit') as HTMLButtonElement;

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    fireEvent.click(submitButton);

    const spinner = getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });

  test('should call Authentication with correct values', () => {
    const {
      sut: { getByTestId },
      authenticationSpy,
    } = makeSut();

    const email = faker.internet.email();
    const emailInput = getByTestId('email');
    const password = faker.internet.password();
    const passwordInput = getByTestId('password');
    const submitButton = getByTestId('submit') as HTMLButtonElement;

    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
