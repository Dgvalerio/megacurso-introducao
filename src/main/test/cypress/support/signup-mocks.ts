// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as Http from './http-mocks';

export const mockEmailInUseError = () =>
  Http.mockForbiddenError(/signup/, 'POST');

export const mockUnexpectedError = () => Http.mockServerError(/signup/, 'POST');

export const mockOk = () =>
  Http.mockOk('POST', /signup/, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
