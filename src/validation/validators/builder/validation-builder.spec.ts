// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '../index';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();

    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut.field(fieldName).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(fieldName, length)]);
  });

  test('should return a list of validations', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut
      .field(fieldName)
      .required()
      .email()
      .min(length)
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, length),
    ]);
  });
});
