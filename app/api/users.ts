import useSWR from "swr"
import { apiFetcher, constructUrl } from "./apiFetcher"
import { AxiosResponse } from "axios"
import { BASE_URL } from "app/util/constants"
import { User } from "app/types"
import { getFormFileFromUri } from "app/util/helpers"
import { objectToFormData } from "./objectToFormData"

export const useUsers = (filters: Record<string, any> = {}) => {
    const url = constructUrl(`/profile`, filters)
    const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: User[] }>>(url)
    return {
        users: data?.data?.results ?? [],
        error,
        isLoading,
        mutate
    }
    }

const updateProfile = async (id: string, user: Record<string, any>) => {
    const photoUrl = (user.photoUrl as string).startsWith(BASE_URL)
        ? user.photoUrl.replace(BASE_URL, '')
        : (getFormFileFromUri(user.photoUrl) as any)
    const processedUser = objectToFormData({  
        ...user,
        photoUrl: undefined,
        socialSecurityNumber: user.socialSecurityNumber.replace(/-/g, ''),
    })
    processedUser.append('photoUrl', photoUrl)
    processedUser.append('socialSecurityNumber', user.socialSecurityNumber)
    processedUser.append('fullName', user.fullName)
    processedUser.append('email', user.email)
    processedUser.append('username', user.username)

    const response = await apiFetcher<User>(`/profile/${id}`, {
      method: 'PUT',
      data: processedUser,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('User updated successfully:', response.data)
    return response.data
} 


export const useUserApi = () => {
    return { updateProfile }
}