import axios, { AxiosResponse } from 'axios';

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '../../../data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
  // eslint-disable-next-line class-methods-use-this
  async post(params: HttpPostParams<any>): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;

    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (e) {
      httpResponse = e.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
