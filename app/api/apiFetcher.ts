import { AxiosRequestConfig, AxiosResponse } from 'axios'
import httpClient from './httpClient'
import { mutate as swrMutate } from 'swr'

export const apiFetcher = async <T = any, K = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T, K>> => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const headers = {
    ...defaultHeaders,
    ...options?.headers
  }
  return await httpClient({ ...options, url, headers, method: options?.method ?? 'GET' })
}

export const mutate = (url: string) => {
  return swrMutate((key) => {
    return typeof key === 'string' && key.startsWith(url)
  })
}
