import { AccessDeniedError, UnexpectedError } from '../../../domain/errors';
import { LoadSurveyList } from '../../../domain/usecases';
import { HttpClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Model[]>
  ) {} // eslint-disable-line no-empty-function

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteSurveys = httpResponse.body || [];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) =>
          Object.assign(remoteSurvey, {
            date: new Date(remoteSurvey.date),
          })
        );
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

// eslint-disable-next-line import/export
export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    answers: {
      image?: string;
      answer: string;
    }[];
    date: string;
    didAnswer: boolean;
  };
}
