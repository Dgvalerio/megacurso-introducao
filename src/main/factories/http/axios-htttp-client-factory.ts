import { AxiosHttpClient } from '../../../infra/http/axios-http-client/axios-http-client';

export const makeAxiosHttpCliente = (): AxiosHttpClient =>
  new AxiosHttpClient();
