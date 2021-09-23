import { InvalidFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {} // eslint-disable-line no-empty-function

  validate(input: object): Error {
    const value = (input as { [key: string]: string })[this.field];
    const valueToCompare = (input as { [key: string]: string })[
      this.fieldToCompare
    ];
    return value !== valueToCompare ? new InvalidFieldError(this.field) : null;
  }
}
