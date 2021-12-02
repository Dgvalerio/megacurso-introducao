// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import { HttpGetClientSpy } from '../../tests';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();

    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
