import { AxiosHttpClient } from './axios-http-client'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockAxiosResult = {
  status: faker.random.numeric(),
  data: faker.science.unit()
}

mockedAxios.post.mockResolvedValue(mockAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.science.unit()
})

describe('AxiosHttpClient', () => {
  test('Should call AxiosHttpClient with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    // Confere se uma funcao mockada é chamada com o argumento passado
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return correct httpResponse', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    const response = await sut.post(request)
    expect(response).toEqual({
      statusCode: mockAxiosResult.status,
      body: mockAxiosResult.data
    })
  })
})
