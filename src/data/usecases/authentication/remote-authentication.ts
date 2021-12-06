import {
  InvalidCredentialsError,
  UnexpectedError,
} from '../../../domain/errors';
import { Authentication } from '../../../domain/usecases';
import { HttpClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {} // eslint-disable-line no-empty-function

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

// eslint-disable-next-line import/export
export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
