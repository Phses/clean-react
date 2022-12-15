import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/tests/mock-http-client'
import { mockAuthentication } from '@/domain/Test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/Errors/Invalid-credentials-erro'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostCliente: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostCliente = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostCliente)
  return {
    sut,
    httpPostCliente
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostCliente } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostCliente.url).toBe(url)
  })
  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostCliente } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostCliente.body).toEqual(authenticationParams)
  })
  test('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostCliente } = makeSut()
    httpPostCliente.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
