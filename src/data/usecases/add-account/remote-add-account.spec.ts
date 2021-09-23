// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { AccountModel } from '../../../domain/models';
import { mockAddAccount } from '../../../domain/test';
import { AddAccountParams } from '../../../domain/usecases';
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
});
