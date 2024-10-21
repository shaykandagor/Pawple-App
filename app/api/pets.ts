import { Pet } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import { fetcher } from 'app/util/helpers'
import useSWR from 'swr'

export const usePets = () => {
  const url = `${BASE_URL}/pets`
  const { data, error, isLoading, mutate } = useSWR<{ results: Pet[] }>(url, fetcher)
  return {
    pets: data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}
