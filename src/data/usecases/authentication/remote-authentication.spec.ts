import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from 'data/tests/mock-http-client'

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct url', async () => {
    const url = 'any-url'
    const httpPostCliente = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostCliente)
    await sut.auth()
    expect(httpPostCliente.url).toBe(url)
  })
})
