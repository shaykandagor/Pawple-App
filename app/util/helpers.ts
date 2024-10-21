import { BASE_URL } from './constants'

export const fetcher = async (url: string, init?: RequestInit) => {
  let _url: string
  if (url.startsWith('http')) {
    _url = url
  } else {
    _url = `${BASE_URL}${url.endsWith('/')?"": "/"}${url}`
  }
  const response = await fetch(_url, init)
  if(response.ok) {
    return await response.json()
  }else{
    throw new Error("Error fetching")
  }
}


