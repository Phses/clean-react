import { HttpPostCliente } from 'data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostCliente {
  url?: string
  async post (url: string): Promise<void> {
    this.url = url
    return await Promise.resolve()
  }
}
