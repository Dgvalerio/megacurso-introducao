// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import * as Helper from './http-mocks';

export const mockEmailInUseError = () => Helper.mockEmailInUseError(/signup/);

export const mockUnexpectedError = () =>
  Helper.mockUnexpectedError('POST', /signup/);

export const mockInvalidData = () =>
  Helper.mockOk('POST', /signup/, {
    invalid: faker.datatype.uuid(),
  });

export const mockOk = () =>
  Helper.mockOk('POST', /signup/, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
