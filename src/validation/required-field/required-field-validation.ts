import { RequiredFieldError } from '../errors';
import { FieldValidation } from '../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string) {}

  // eslint-disable-next-line class-methods-use-this
  validate(value: string): Error {
    return new RequiredFieldError();
  }
}
