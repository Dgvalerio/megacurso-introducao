import { FieldValidation } from '../protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error = null;

  // eslint-disable-next-line no-empty-function
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return this.error;
  }
}
