/* eslint-disable class-methods-use-this */
import axios, { AxiosResponse } from 'axios';

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '../../../data/protocols/http';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams<any>): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (e) {
      axiosResponse = e.response;
    }

    return this.adapt(axiosResponse);
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.get(params.url);
    } catch (e) {
      axiosResponse = e.response;
    }

    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
