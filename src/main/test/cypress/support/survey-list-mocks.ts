import * as Http from './http-mocks';

export const mockUnexpectedError = () => Http.mockServerError(/surveys/, 'GET');

export const mockAccessDeniedError = () =>
  Http.mockForbiddenError(/surveys/, 'GET');
