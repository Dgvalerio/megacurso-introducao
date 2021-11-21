// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { RemoteLoadSurveyList } from '../usecases/load-survey-list/remote-load-survey-list';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    { answer: faker.random.words(4), image: faker.internet.url() },
    { answer: faker.random.words(5), image: faker.internet.url() },
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
