// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
import * as faker from 'faker';

import { LoadSurveyResult, SaveSurveyResult } from '../usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.words(5),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: false,
    },
  ],
  date: faker.date.recent(),
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount += 1;

    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  callsCount = 0;

  params: SaveSurveyResult.Params;

  surveyResult = mockSurveyResultModel();

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.callsCount += 1;
    this.params = params;

    return this.surveyResult;
  }
}
