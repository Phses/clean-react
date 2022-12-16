import { HttpResponse } from '@/data/protocols/http/http-response'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostCliente<T, R> {
  post (params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
