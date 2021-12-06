/* eslint-disable no-empty-function */
import { SaveSurveyResult } from '../../../domain/usecases';
import { RemoteSurveyResultModel } from '../../models';
import { HttpClient } from '../../protocols/http';

// eslint-disable-next-line import/export
export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    });

    return null;
  }
}

// eslint-disable-next-line import/export
export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
