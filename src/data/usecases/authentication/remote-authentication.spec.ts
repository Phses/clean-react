import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/tests/mock-http-client'
import { mockAccountModel, mockAuthentication } from '@/domain/Test/mock-account'
import { InvalidCredentialsError } from '@/domain/Errors/Invalid-credentials-erro'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { faker } from '@faker-js/faker'
import { UnexpectedError } from '@/domain/Errors/Unexpected-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostCliente: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostCliente = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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
  test('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostCliente } = makeSut()
    httpPostCliente.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpPostCliente } = makeSut()
    httpPostCliente.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostCliente } = makeSut()
    httpPostCliente.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should return an AccountModel if HttpPostClient return 200', async () => {
    const { sut, httpPostCliente } = makeSut()
    const httpResult = mockAccountModel()
    httpPostCliente.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    await expect(account).toEqual(httpResult)
  })
})
