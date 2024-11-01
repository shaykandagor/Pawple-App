import useSession from 'app/session/useSession'
import {BASE_URL} from 'app/util/constants'

export const useFetch = () => {
  const { sessionToken } = useSession()
  const fetcher = async (url: string, init?: RequestInit & { headers?: Record<string, any> }) => {
    let _url: string
    if (url.startsWith('http')) {
      _url = url
    } else {
      _url = `${BASE_URL}${url.endsWith('/') ? '' : '/'}${url}`
    }
    const response = await fetch(
      _url,
      init
        ? { ...init, headers: { 'x-access-token': sessionToken, ...init?.headers } as any }
        : undefined
    )
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Error fetching')
    }
  }
  return fetcher
}
