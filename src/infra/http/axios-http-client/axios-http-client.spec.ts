import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { HttpPostParams } from '../../../data/protocols/http';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const sut = makeSut();
    const request = mockPostRequest();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
