import { HttpPostCliente } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct url', async () => {
    class HttpPostClientSpy implements HttpPostCliente {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }
    const url = 'any-url'
    const httpPostCliente = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostCliente)
    await sut.auth()
    expect(httpPostCliente.url).toBe(url)
  })
})
