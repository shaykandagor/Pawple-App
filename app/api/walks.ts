import { Walk, WalkDuration } from 'app/types'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { apiFetcher, constructUrl } from './apiFetcher'

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

export const useWalks = (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/walks`, filters)
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: Walk[] }>>(url)
  return {
    walks: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}

const getWalks = async (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/walks`, filters)
  const response = await apiFetcher<Walk[]>(url, {
    method: 'GET'
  })
  return response.data
}

const getWalk = async (id: string) => {
  const response = await apiFetcher<Walk>(`/walks/${id}`, {
    method: 'GET'
  })
  return response.data
}

export const useWalkApi = () => {
  return { getWalks, getWalk }
}

