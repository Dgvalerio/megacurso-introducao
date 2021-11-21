import { HttpGetClient } from '../../../data/protocols/http';
import { AuthorizeHttpGetClientDecorator } from '../../decorators';
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient =>
  new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
