import { AccountModel } from '../../domain/models';
import { mockAuthenticationModel } from '../../domain/test';
import { Authentication } from '../../domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();

  params: Authentication.Params;

  callsCount = 0;

  auth(params: Authentication.Params): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return Promise.resolve(this.account);
  }
}
