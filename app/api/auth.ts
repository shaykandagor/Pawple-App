import { BASE_URL } from 'app/util/constants'
import { apiFetcher } from './apiFetcher'
import { objectToFormData } from './objectToFormData'
import { getFormFileFromUri } from 'app/util/helpers'

const login = async (credentials: { id: string; password: string }) => {
  return await apiFetcher(`/auth/login`, { method: 'POST', data: credentials })
}

const register = async (credentials: Record<string, any>) => {
  return await apiFetcher(`/auth/register`, { method: 'POST', data: credentials })
}

const updateUserInfo = async (id: string, user: Record<string, any>) => {
    const photoUrl = (user.photoUrl as string).startsWith(BASE_URL)
      ? user.photoUrl.replace(BASE_URL, '')
      : (getFormFileFromUri(user.photoUrl) as any)

    const formData = objectToFormData({
      ...user,
      photoUrl: undefined
    })
    formData.append('photoUrl', photoUrl)
    formData.append('fullName', user.fullName)
    formData.append('username', user.username)
    formData.append('email', user.email)

    const response = await apiFetcher(`/auth/update`, {
      method: 'PUT',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
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
    updateUserInfo
  }
}
