import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { mockAxiosPost } from '@/infra/http/test/mock-axios'
import { mockPostRequest } from '@/data/tests/mock-http-post'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxiosPost()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call AxiosHttpClient with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    // Confere se uma funcao mockada é chamada com o argumento passado
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return correct httpResponse', () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(request)
    // mockedAxios.post.mock.results[0].value retorna uma promise do mockedResolvedValue do mock-axios
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
