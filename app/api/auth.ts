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

const updateUserInfo = async (credentials: Record<string, any>) => {
  try {
    const photoUrl = credentials.photoUrl.startsWith(BASE_URL)
      ? credentials.photoUrl.replace(BASE_URL, '')
      : (getFormFileFromUri(credentials.photoUrl) as any)

    const formData = objectToFormData({
      ...credentials,
      photoUrl: undefined
    })
    formData.append('photoUrl', photoUrl)
    formData.append('fullName', credentials.fullName)
    formData.append('username', credentials.username)
    formData.append('email', credentials.email)

    const response = await apiFetcher(`/auth/update`, {
      method: 'PUT',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
  } catch (error) {
    console.error('Error updating user info:', error)
    throw new Error('Failed to update user profile. Please try again.')
  }
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
