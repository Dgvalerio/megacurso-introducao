// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { EmailInUseError, UnexpectedError } from '../../../domain/errors';
import { mockAddAccount, mockAddAccountModel } from '../../../domain/test';
import { AddAccount } from '../../../domain/usecases';
import { HttpStatusCode } from '../../protocols/http';
import { HttpClientSpy } from '../../tests';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<AddAccount.Params, RemoteAddAccount.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<
    AddAccount.Params,
    RemoteAddAccount.Model
  >();
  const sut = new RemoteAddAccount(url, httpClientSpy);

  return { sut, httpClientSpy };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    const addAccountParams = mockAddAccount();

    await sut.add(addAccountParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AddAccount.Model if returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpResult = mockAddAccountModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const addAccountParams = mockAddAccount();

    const account = await sut.add(addAccountParams);

    expect(account).toEqual(httpResult);
  });
});
