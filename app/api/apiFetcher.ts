import { AxiosRequestConfig, AxiosResponse } from 'axios'
import httpClient from "./httpClient"

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
