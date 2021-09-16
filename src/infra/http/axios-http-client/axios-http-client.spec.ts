import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL', async () => {
    const sut = new AxiosHttpClient();
    const url = faker.internet.url();

    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
