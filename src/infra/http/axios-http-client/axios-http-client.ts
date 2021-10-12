import axios, { AxiosResponse } from 'axios';

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '../../../data/protocols/http';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  // eslint-disable-next-line class-methods-use-this
  async post(params: HttpPostParams<any>): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (e) {
      axiosResponse = e.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async get(params: HttpGetParams): Promise<HttpResponse> {
    const axiosResponse = await axios.get(params.url);

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
