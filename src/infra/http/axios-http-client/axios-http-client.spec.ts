import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const sut = makeSut();
    const url = faker.internet.url();

    await sut.post({ url });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
