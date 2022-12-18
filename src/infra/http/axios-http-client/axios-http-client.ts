import { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {
    // axios.post e uma forma de garantir qual verbo esta sendo chamado
    await axios.post(params.url, params.body)
  }
}
