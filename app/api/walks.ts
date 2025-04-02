import { WalkDuration } from 'app/types'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { constructUrl } from './apiFetcher'

export const useWalkDurations = (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/walkdurations`, filters)
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: WalkDuration[] }>>(url)
  return {
    walkdurations: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}
