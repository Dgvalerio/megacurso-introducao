/* eslint-disable class-methods-use-this */
import axios, { AxiosResponse } from 'axios';

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '../../../data/protocols/http';

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    body,
    headers,
    method,
  }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url,
        method,
        data: body,
        headers,
      });
    } catch (e) {
      axiosResponse = e.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
