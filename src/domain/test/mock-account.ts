// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { AccountModel } from '../models';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
});
