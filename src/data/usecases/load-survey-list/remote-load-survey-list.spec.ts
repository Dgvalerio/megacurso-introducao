// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { AccessDeniedError, UnexpectedError } from '../../../domain/errors';
import { HttpStatusCode } from '../../protocols/http';
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '../../tests';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);

  return { sut, httpGetClientSpy };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);

    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    const httpResult = mockRemoteSurveyListModel();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const surveyList = await sut.loadAll();

    expect(surveyList).toEqual(
      httpResult.map((item) => ({
        id: item.id,
        question: item.question,
        answers: item.answers,
        didAnswer: item.didAnswer,
        date: new Date(item.date),
      }))
    );
  });

  test('Should return a empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };

    const surveyList = await sut.loadAll();

    expect(surveyList).toEqual([]);
  });
});
