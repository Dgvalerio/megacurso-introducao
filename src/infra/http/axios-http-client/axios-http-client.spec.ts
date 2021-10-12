import axios from 'axios';

import { mockPostRequest } from '../../../data/tests';
import { mockAxios, mockHttpResponse } from '../../test';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  describe('Post', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut();
      const request = mockPostRequest();

      await sut.post(request);

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return the correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut();
      const promise = sut.post(mockPostRequest());

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });

    test('Should return the correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const promise = sut.post(mockPostRequest());

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });
});
