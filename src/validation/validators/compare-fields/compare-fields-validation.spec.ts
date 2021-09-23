// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (fieldName: string, fieldToCompare: string) =>
  new CompareFieldsValidation(fieldName, fieldToCompare);

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldName = faker.database.column();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(fieldName, fieldToCompare);

    const error = sut.validate({
      [fieldName]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if compare is valid', () => {
    const fieldName = faker.database.column();
    const fieldToCompare = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(fieldName, fieldToCompare);

    const error = sut.validate({
      [fieldName]: valueToCompare,
      [fieldToCompare]: valueToCompare,
    });

    expect(error).toBeFalsy();
  });
});
