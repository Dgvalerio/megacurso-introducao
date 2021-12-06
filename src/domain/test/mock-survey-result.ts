// eslint-disable-next-line import/no-extraneous-dependencies
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
