import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

export const mockHttpResponse = (): Partial<AxiosResponse> => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse());
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
