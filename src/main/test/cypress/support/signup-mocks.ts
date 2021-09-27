import * as Helper from './http-mocks';

export const mockEmailInUseError = () => Helper.mockEmailInUseError(/signup/);

export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError('POST', /signup/);
