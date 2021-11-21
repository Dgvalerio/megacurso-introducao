import { UnexpectedError } from '../../../domain/errors';
import { LoadSurveyList } from '../../../domain/usecases/load-survey-list';
import { HttpGetClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {} // eslint-disable-line no-empty-function

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
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
