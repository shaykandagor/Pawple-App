import { Pet } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import useSWR from 'swr'
import {useFetch} from '.'

export const usePets = () => {
  const fetcher = useFetch()
  const url = `${BASE_URL}/pets`
  const { data, error, isLoading, mutate } = useSWR<{ results: Pet[] }>(url, fetcher)
  return {
    pets: data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}
