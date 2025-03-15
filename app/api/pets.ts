import {Pet} from 'app/types'
import {AxiosResponse} from 'axios'
import useSWR from 'swr'

export const usePets = () => {
  const url = `/pets`
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: Pet[] }>>(url)
  return {
    pets: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}
