import { Pet } from 'app/types'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { apiFetcher } from './apiFetcher'
import { getFormFileFromUri } from 'app/util/helpers'
import { objectToFormData } from './objectToFormData'

export const usePets = () => {
  const url = `/pets`
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: Pet[] }>>(url)
  return {
    pets: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}

const addPet = async (pet: Record<string, any>) => {
  const formData = objectToFormData({ ...pet, photoUrl: undefined })
  formData.append('photoUrl', getFormFileFromUri(pet.photoUrl) as any)
  const response = await apiFetcher<Pet>('/pets', {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

const updatePet = async (id: string, pet: Record<string, any>) => {
  const response = await apiFetcher<Pet>(`/pets/${id}`, { method: 'PUT', data: pet })
  return response.data
}

const deletePet = async (id: string) => {
  const response = await apiFetcher<Pet>(`/pets/${id}`, { method: 'DELETE' })
  return response.data
}

export const usePetApi = () => {
  return { addPet, updatePet, deletePet }
}
