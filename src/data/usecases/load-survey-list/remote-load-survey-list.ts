import { UnexpectedError } from '../../../domain/errors';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { HttpGetClient, HttpStatusCode } from '../../protocols/http';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Model[]>
  ) {} // eslint-disable-line no-empty-function

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
