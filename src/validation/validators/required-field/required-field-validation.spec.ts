// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { RequiredFieldError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (fieldName: string) => new RequiredFieldValidation(fieldName);

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: '' });

    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if field is not empty', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.random.word() });

    expect(error).toBeFalsy();
  });
});
