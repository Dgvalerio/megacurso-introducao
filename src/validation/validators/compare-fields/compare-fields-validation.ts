import { InvalidFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {} // eslint-disable-line no-empty-function

  validate(value: string): Error {
    return value !== this.valueToCompare
      ? new InvalidFieldError(this.field)
      : null;
  }
}
