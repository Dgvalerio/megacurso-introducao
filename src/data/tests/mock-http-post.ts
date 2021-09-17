// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { HttpPostParams } from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
