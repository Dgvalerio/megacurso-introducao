// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { InvalidFieldError } from '../../errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (fieldName: string, fieldToCompare: string) =>
  new CompareFieldsValidation(fieldName, fieldToCompare);

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldName = 'any_field';
    const fieldToCompare = 'other_field';
    const sut = makeSut(fieldName, fieldToCompare);

    const error = sut.validate({
      [fieldName]: 'any_value',
      [fieldToCompare]: 'other_value',
    });

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test('should return falsy if compare is valid', () => {
    const fieldName = 'any_field';
    const fieldToCompare = 'other_field';
    const valueToCompare = faker.random.word();
    const sut = makeSut(fieldName, fieldToCompare);

    const error = sut.validate({
      [fieldName]: valueToCompare,
      [fieldToCompare]: valueToCompare,
    });

    expect(error).toBeFalsy();
  });
});
