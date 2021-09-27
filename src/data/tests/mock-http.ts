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
