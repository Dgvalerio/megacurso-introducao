// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { Authentication } from '../usecases';
import { mockAccountModel } from './mock-account';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();
