// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { LoadSurveyList } from '../usecases';

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    { answer: faker.random.words(4), image: faker.internet.url() },
    { answer: faker.random.words(5), image: faker.internet.url() },
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
