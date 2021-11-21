import {
  InvalidCredentialsError,
  UnexpectedError,
} from '../../../domain/errors';
import { Authentication } from '../../../domain/usecases';
import { HttpPostClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      Authentication.Params,
      RemoteAuthentication.Model
    >
  ) {} // eslint-disable-line no-empty-function

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
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
