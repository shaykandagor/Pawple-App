import { httpClient } from '.'

const login = async (credentials: { id: string; password: string }) => {
  return await httpClient.post(`/auth/login`, credentials, {
    headers: { 'Content-Type': 'application/json' }
  })
}

const register = async (credentials: Record<string, any>) => {
  return await httpClient.post(`/auth/register`, credentials, {
    headers: { 'Content-Type': 'application/json' }
  })
}

const getUserByToken = async (token: string) => {
  return await httpClient.get(`/users/profile`, {
    headers: { 'x-access-token': token }
  })
}

export const useAuth = () => {
  return {
    login,
    getUserByToken,
    register
  }
}
