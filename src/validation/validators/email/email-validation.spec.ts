// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { EmailValidation } from './email-validation';

const makeSut = (fieldName: string) => new EmailValidation(fieldName);

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.random.word() });

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if email is valid', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: faker.internet.email() });

    expect(error).toBeFalsy();
  });

  test('should return falsy if email is empty', () => {
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName);

    const error = sut.validate({ [fieldName]: '' });

    expect(error).toBeFalsy();
  });
});
