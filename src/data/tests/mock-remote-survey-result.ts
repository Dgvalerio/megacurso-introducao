// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { RemoteLoadSurveyResult } from '../usecases';

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.url(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(),
      },
      {
        answer: faker.random.words(5),
        count: faker.datatype.number(),
        percent: faker.datatype.number(),
      },
    ],
    date: faker.date.recent().toISOString(),
  });
