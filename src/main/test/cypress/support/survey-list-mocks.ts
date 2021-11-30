import * as Http from './http-mocks';

export const mockUnexpectedError = () => Http.mockServerError(/surveys/, 'GET');
