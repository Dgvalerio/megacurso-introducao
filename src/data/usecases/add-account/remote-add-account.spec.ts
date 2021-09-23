// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { EmailInUseError, UnexpectedError } from '../../../domain/errors';
import { AccountModel } from '../../../domain/models';
import { mockAddAccount } from '../../../domain/test';
import { AddAccountParams } from '../../../domain/usecases';
import { HttpStatusCode } from '../../protocols/http';
import { HttpPostClientSpy } from '../../tests';
import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.add(mockAddAccount());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const addAccountParams = mockAddAccount();

    await sut.add(addAccountParams);

    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const addAccountParams = mockAddAccount();

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
