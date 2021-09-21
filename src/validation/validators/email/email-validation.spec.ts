// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { EmailValidation } from './email-validation';

const makeSut = (fieldName = faker.database.column()) =>
  new EmailValidation(fieldName);

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if email is valid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
