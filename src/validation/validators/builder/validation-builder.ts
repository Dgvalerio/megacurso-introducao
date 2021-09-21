import { FieldValidation } from '../../protocols/field-validation';
import { RequiredFieldValidation } from '../index';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {} // eslint-disable-line no-empty-function

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
