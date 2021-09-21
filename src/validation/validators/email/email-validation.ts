import { InvalidFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class EmailValidation implements FieldValidation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string) {}

  validate(value: string): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !value || emailRegex.test(value)
      ? null
      : new InvalidFieldError(this.field);
  }
}
