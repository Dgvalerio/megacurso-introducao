// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (fieldName: string) => new MinLengthValidation(fieldName, 5);

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.random.alphaNumeric(4) });

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if value is valid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.random.alphaNumeric(5) });

    expect(error).toBeFalsy();
  });

  test('should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field');

    const error = sut.validate({
      invalid_field: faker.random.alphaNumeric(5),
    });

    expect(error).toBeFalsy();
  });
});
