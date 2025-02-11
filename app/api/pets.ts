import { Pet } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import useSWR from 'swr'
import {httpClient} from '.'
import useSession from 'app/session/useSession'

export const usePets = () => {
  const {sessionToken} = useSession()
  const fetcher = async (url: string) => {
    const res = await httpClient.get(url, {headers: {"x-access-token": sessionToken}})
    return res.data
  }
  const url = `${BASE_URL}/pets`
  const { data, error, isLoading, mutate } = useSWR<{ results: Pet[] }>(url, fetcher)
  return {
    pets: data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}
