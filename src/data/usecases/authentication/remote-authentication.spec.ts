// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import {
  InvalidCredentialsError,
  UnexpectedError,
} from '../../../domain/errors';
import { AccountModel } from '../../../domain/models';
import {
  mockAuthentication,
  mockAuthenticationModel,
} from '../../../domain/test';
import { Authentication } from '../../../domain/usecases';
import { HttpStatusCode } from '../../protocols/http';
import { HttpClientSpy } from '../../tests';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<
    Authentication.Params,
    RemoteAuthentication.Model
  >;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<
    Authentication.Params,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return { sut, httpClientSpy };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    const authenticationParams = mockAuthentication();

    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const authenticationParams = mockAuthentication();

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const authenticationParams = mockAuthentication();

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const authenticationParams = mockAuthentication();

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const authenticationParams = mockAuthentication();

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpResult = mockAuthenticationModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const authenticationParams = mockAuthentication();

    const account = await sut.auth(authenticationParams);

    expect(account).toEqual(httpResult);
  });
});
