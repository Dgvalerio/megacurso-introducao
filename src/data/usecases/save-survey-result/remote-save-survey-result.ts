/* eslint-disable no-empty-function */
import { AccessDeniedError, UnexpectedError } from '../../../domain/errors';
import { SaveSurveyResult } from '../../../domain/usecases';
import { RemoteSurveyResultModel } from '../../models';
import { HttpClient, HttpStatusCode } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    });

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
export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
