import { InvalidFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class EmailValidation implements FieldValidation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError(this.field);
  }
}
