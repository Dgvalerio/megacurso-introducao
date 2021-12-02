/* eslint-disable no-empty-function */
import { AccessDeniedError, UnexpectedError } from '../../../domain/errors';
import { LoadSurveyResult } from '../../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    const remoteSurveyResult = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          ...remoteSurveyResult,
          date: new Date(remoteSurveyResult.date),
        };
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

// eslint-disable-next-line import/export
export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: {
      image?: string;
      answer: string;
      count: number;
      percent: number;
    }[];
  };
}
