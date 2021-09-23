/* eslint-disable import/no-extraneous-dependencies */
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { Helper, ValidationStub } from '../../test';
import { SignUp } from '../index';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const sut = render(<SignUp validation={validationStub} />);

  return { sut };
};

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  fireEvent.input(sut.getByTestId(fieldName), { target: { value } });
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, 'error-wrap', 0);

    Helper.testButtonIsDisabled(sut, 'submit', true);

    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório');
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório');
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório');
  });

  test('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateField(sut, 'name');

    Helper.testStatusForField(sut, 'name', validationError);
  });
});
