import { RemoteAuthentication } from '../../../../data/usecases';
import { Authentication } from '../../../../domain/usecases';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
