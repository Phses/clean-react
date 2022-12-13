import { HttpPostCliente } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostCliente
  ) {}

  async auth (): Promise<void> {
    await this.httpPostClient.post(this.url)
  }
}
