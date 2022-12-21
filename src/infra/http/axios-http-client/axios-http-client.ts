import { HttpPostCliente, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostCliente<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    // axios.post e uma forma de garantir qual verbo esta sendo chamado
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
