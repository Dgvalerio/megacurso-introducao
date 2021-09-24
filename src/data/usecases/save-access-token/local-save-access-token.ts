import { UnexpectedError } from '../../../domain/errors';
import { SaveAccessToken } from '../../../domain/usecases';
import { SetStorage } from '../../protocols/cache/set-storage';

export class LocalSaveAccessToken implements SaveAccessToken {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError();

    await this.setStorage.set('accessToken', accessToken);
  }
}
