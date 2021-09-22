/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, RenderResult } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import Context from '../../contexts/form/form-context';
import { Input } from '../index';

const makeSut = (fieldName: string): RenderResult =>
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const fieldName = faker.database.column();
    const { getByTestId } = makeSut(fieldName);

    const input = getByTestId(fieldName) as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });

  test('should remove readOnly on focus', () => {
    const fieldName = faker.database.column();
    const { getByTestId } = makeSut(fieldName);

    const input = getByTestId(fieldName) as HTMLInputElement;

    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });
});
