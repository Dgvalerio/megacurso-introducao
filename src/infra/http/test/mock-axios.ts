import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.datatype.number(),
  });

  return mockedAxios;
};
