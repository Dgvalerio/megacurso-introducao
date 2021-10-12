// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
import * as faker from 'faker';

import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
  HttpGetClient,
  HttpGetParams,
} from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
});

export class HttpPostClientSpy<BodyType = any, ResponseType = any>
  implements HttpPostClient<BodyType, ResponseType>
{
  url?: string;

  body?: BodyType;

  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(
    params: HttpPostParams<BodyType>
  ): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<ResponseType = any>
  implements HttpGetClient<ResponseType>
{
  url: string;

  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    return this.response;
  }
}
