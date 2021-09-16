// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { mockAuthentication } from '../../../domain/test/mock-authentication';
import { HttpStatusCode } from '../../protocols/http/http-response';
import { HttpPostClientSpy } from '../../tests/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const authenticationParams = mockAuthentication();

    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const authenticationParams = mockAuthentication();

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
