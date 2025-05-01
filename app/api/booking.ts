import { AxiosResponse } from 'axios'
import { apiFetcher, constructUrl } from './apiFetcher'
import useSWR from 'swr'
import { Booking } from 'app/types'

export const useBookings = (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/bookings`, filters)
  const { data, error, isLoading, mutate } =
    useSWR<AxiosResponse<{ results: Booking[] }>>(url)
  return {
    bookings: data?.data?.results ?? [],
    error,
    isLoading,
    mutate
  }
}

const addBooking = async (booking: Record<string, any>) => {
  const response = await apiFetcher<Booking>('/bookings', {
    method: 'POST',
    data: booking
  })
  return response.data
}

const updateBooking = async (id: string, booking: Record<string, any>) => {
  const response = await apiFetcher<Booking>(`/bookings/${id}`, {
    method: 'PUT',
    data: booking
  })
  return response.data
}

const claimBooking = async (id: string) => {
  const response = await apiFetcher<Booking>(`/walks/${id}/claim`, {
    method: 'GET'
  })
  return response.data
}

const cancelBooking = async (id: string) => {
  const response = await apiFetcher<Booking>(`/walks/${id}/cancel`, {
    method: 'GET'
  })
  return response.data
}

const deleteBooking = async (id: string) => {
  const response = await apiFetcher<Booking>(`/bookings/${id}`, {
    method: 'DELETE'
  })
  return response.data
}

export const useBookingApi = () => {
  return {
    addBooking,
    updateBooking,
    claimBooking,
    deleteBooking,
    cancelBooking
  }
}
