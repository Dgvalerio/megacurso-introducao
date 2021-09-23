import { RemoteAddAccount } from '../../../../data/usecases/add-account/remote-add-account';
import { AddAccount } from '../../../../domain/usecases';
import { makeApiUrl } from '../../http/api-url-factory';
import { makeAxiosHttpCliente } from '../../http/axios-htttp-client-factory';

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpCliente());
