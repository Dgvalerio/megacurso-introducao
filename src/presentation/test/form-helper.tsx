/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;

  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);

  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  fireEvent.input(screen.getByTestId(fieldName), { target: { value } });
};

export const testElementExists = (fieldName: string): void => {
  expect(screen.getByTestId(fieldName)).toBeTruthy();
};

export const testElementText = (fieldName: string, text: string): void => {
  expect(screen.getByTestId(fieldName).textContent).toBe(text);
};
