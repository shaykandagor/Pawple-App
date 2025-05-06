import { Pet } from 'app/types'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { apiFetcher, constructUrl } from './apiFetcher'
import { getFormFileFromUri } from 'app/util/helpers'
import { objectToFormData } from './objectToFormData'
import { BASE_URL } from 'app/util/constants'

export const usePets = (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/pets`, filters)
  const { data, error, isLoading, mutate } =
    useSWR<AxiosResponse<{ results: Pet[] }>>(url)
  return {
    pets: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}

const addPet = async (pet: Record<string, any>) => {
  const formData = objectToFormData({
    ...pet,
    photoUrl: undefined,
    birthDay:
      typeof pet.birthDay === 'string'
        ? pet.birthDay
        : pet.birthDay.toISOString()
  })
  formData.append('photoUrl', getFormFileFromUri(pet.photoUrl) as any)
  const response = await apiFetcher<Pet>('/pets', {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

const updatePet = async (id: string, pet: Record<string, any>) => {
  const photoUrl = (pet.photoUrl as string).startsWith(BASE_URL)
    ? pet.photoUrl.replace(BASE_URL, '')
    : (getFormFileFromUri(pet.photoUrl) as any)
  const formData = objectToFormData({
    ...pet,
    photoUrl: undefined,
    birthDay:
      typeof pet.birthDay === 'string'
        ? pet.birthDay
        : pet.birthDay.toISOString()
  })
  formData.append('photoUrl', photoUrl)
  const response = await apiFetcher<Pet>(`/pets/${id}`, {
    method: 'PUT',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

const deletePet = async (id: string) => {
  console.log('Deleting pet with ID:', id) // Debugging log
  const response = await apiFetcher<Pet>(`/pets/${id}`, { method: 'DELETE' })
  return response.data
}

export const usePetApi = () => {
  return { addPet, updatePet, deletePet }
}
