// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import Context from '../../contexts/form/form-context';
import { Input } from '../index';

const makeSut = (): RenderResult =>
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  );

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = makeSut();

    const input = getByTestId('field') as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
});
