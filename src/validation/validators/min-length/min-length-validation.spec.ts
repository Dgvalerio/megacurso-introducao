// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (fieldName = faker.database.column()) =>
  new MinLengthValidation(fieldName, 5);

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate(faker.random.alphaNumeric(4));

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if value is valid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.random.alphaNumeric(5));

    expect(error).toBeFalsy();
  });
});
