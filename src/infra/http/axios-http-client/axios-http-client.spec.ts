import { AxiosHttpClient } from './axios-http-client'
import { faker } from '@faker-js/faker'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('Should call AxiosHttpClient with correct url', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    // Confere se uma funcao mockada é chamada com o argumento passado
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
