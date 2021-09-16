import { HttpPostClient } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {} // eslint-disable-line no-empty-function

  async auth(): Promise<void> {
    await this.httpPostClient.post({ url: this.url });
    return Promise.resolve();
  }
}
