import { RequiredFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const value = (input as { [key: string]: string })[this.field];
    return value ? null : new RequiredFieldError();
  }
}
