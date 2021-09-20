// eslint-disable-next-line import/no-extraneous-dependencies
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import React from 'react';

import { ValidationSpy } from '../../test';
import Login from './login';

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
    const email = faker.internet.email();

    fireEvent.input(emailInput, { target: { value: email } });

    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual(email);
  });

  test('should call Validation with correct password', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const passwordInput = getByTestId('password');
    const password = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: password } });

    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual(password);
  });
});
