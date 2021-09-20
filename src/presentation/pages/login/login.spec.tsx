// eslint-disable-next-line import/no-extraneous-dependencies
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import React from 'react';

import { Validation } from '../../protocols/validation';
import Login from './login';

class ValidationSpy implements Validation {
  errorMessage: string;

  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return { sut, validationSpy };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('should start with initial state', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const errorWrap = getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);

    const emailStatus = getByTestId('email-status') as HTMLButtonElement;

    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId('password-status') as HTMLButtonElement;

    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('should call Validation with correct email', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const emailInput = getByTestId('email');

    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    expect(validationSpy.input).toEqual({ email: 'any_email' });
  });

  test('should call Validation with correct password', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const passwordInput = getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    expect(validationSpy.input).toEqual({ password: 'any_password' });
  });
});
