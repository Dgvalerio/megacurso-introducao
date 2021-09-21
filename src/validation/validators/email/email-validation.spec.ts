// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const field = faker.random.word();
    const sut = new EmailValidation(field);

    const error = sut.validate(field);

    expect(error).toEqual(new InvalidFieldError(field));
  });

  test('should return falsy if email is valid', () => {
    const field = faker.random.word();
    const sut = new EmailValidation(field);

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
