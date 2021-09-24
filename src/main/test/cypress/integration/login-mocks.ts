// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as Helper from '../support/http-mocks';

export const mockInvalidCredentialsError = () =>
  Helper.mockInvalidCredentialsError(/login/);

export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError('POST', /login/);

export const mockOk = () =>
  Helper.mockOk('POST', /login/, {
    accessToken: faker.datatype.uuid(),
  });

export const mockInvalidData = () =>
  Helper.mockOk('POST', /login/, {
    invalid: faker.datatype.uuid(),
  });
