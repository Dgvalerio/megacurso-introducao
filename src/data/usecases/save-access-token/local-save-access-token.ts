import { SaveAccessToken } from '../../../domain/usecases/save-access-token';
import { SetStorage } from '../../protocols/cache/set-storage';

export class LocalSaveAccessToken implements SaveAccessToken {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken);
  }
}
