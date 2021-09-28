import { UnexpectedError } from '../../../domain/errors';
import { HttpGetClient, HttpStatusCode } from '../../protocols/http';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {} // eslint-disable-line no-empty-function

  async loadAll(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
