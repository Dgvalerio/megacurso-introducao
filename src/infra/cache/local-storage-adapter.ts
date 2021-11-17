import { SetStorage } from '../../data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  // eslint-disable-next-line class-methods-use-this
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
