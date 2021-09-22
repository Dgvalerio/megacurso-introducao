import { RemoteAuthentication } from '../../../../data/usecases/authentication/remote-authentication';
import { Authentication } from '../../../../domain/usecases';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpCliente } from '../../http/axios-htttp-client-factory';

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl(), makeAxiosHttpCliente());
