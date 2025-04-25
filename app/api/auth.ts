import { apiFetcher } from './apiFetcher';

const login = async (credentials: { id: string; password: string }) => {
  return await apiFetcher(`/auth/login`, { method: 'POST', data: credentials })
}

const register = async (credentials: Record<string, any>) => {
  return await apiFetcher(`/auth/register`, { method: 'POST', data: credentials })
}

const getUserByToken = async (token: string) => {
  return await apiFetcher(`/users/profile`, {
    headers: { 'x-access-token': token }
  })
}

export const useAuth = () => {
  return {
    login,
    getUserByToken,
    register,
  }
}
