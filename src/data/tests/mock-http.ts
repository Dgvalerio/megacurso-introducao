// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;

  body?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
