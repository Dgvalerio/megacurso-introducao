import { UnexpectedError } from '../../../domain/errors';
import { AccountModel } from '../../../domain/models';
import { UpdateCurrentAccount } from '../../../domain/usecases';
import { SetStorage } from '../../protocols/cache/set-storage';

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError();

    this.setStorage.set('account', JSON.stringify(account));
  }
}
