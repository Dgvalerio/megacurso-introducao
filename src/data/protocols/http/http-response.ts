// eslint-disable-next-line no-shadow
export enum HttpStatusCode {
  serverError = 500,
  notFound = 404,
  forbidden = 403,
  unauthorized = 401,
  badRequest = 400,
  noContent = 204,
  ok = 200,
}

export type HttpResponse<BodyType = any> = {
  statusCode: HttpStatusCode;
  body?: BodyType;
};
