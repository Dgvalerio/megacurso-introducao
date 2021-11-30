// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as Http from './http-mocks';

export const mockInvalidCredentialsError = () =>
  Http.mockUnauthorizedError(/login/);

export const mockUnexpectedError = () => Http.mockServerError(/login/, 'POST');

export const mockOk = () =>
  Http.mockOk('POST', /login/, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
