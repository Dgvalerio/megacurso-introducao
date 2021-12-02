/* eslint-disable no-empty-function */
import { AccessDeniedError } from '../../../domain/errors';
import { HttpGetClient, HttpStatusCode } from '../../protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new AccessDeniedError();
    }
  }
}
