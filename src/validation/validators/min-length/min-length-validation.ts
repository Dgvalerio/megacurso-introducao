import { InvalidFieldError } from '../../errors';
import { FieldValidation } from '../../protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    const value = (input as { [key: string]: string })[this.field];
    return value?.length < this.minLength
      ? new InvalidFieldError(this.field)
      : null;
  }
}
