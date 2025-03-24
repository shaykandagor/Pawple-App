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

export function constructUrl(
  path: string,

  params: Record<string, string | number | boolean | undefined> = {}
): string {
  const [basePath, existingQuery] = path.split('?') // Split the path into base path and existing query

  const existingParams = new URLSearchParams(existingQuery || '') // Parse existing query parameters

  const newParams = new URLSearchParams()

  // Add new params

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      newParams.set(key, String(value)) // Add the new parameters
    }
  })

  // Merge existing and new parameters

  const mergedParams = new URLSearchParams(existingParams)

  newParams.forEach((value, key) => {
    mergedParams.set(key, value) // Overwrite or add new params
  })

  const queryString = mergedParams.toString()

  return queryString ? `${basePath}?${queryString}` : basePath // Combine base path and merged query string
}
