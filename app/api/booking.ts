import { AxiosResponse } from "axios"
import { apiFetcher, constructUrl } from "./apiFetcher"
import useSWR from "swr"
import { Booking } from "app/types"


export const useBookings = (filters: Record<string, any> = {}) => {
  const url = constructUrl(`/bookings`, filters)
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<{ results: Booking[] }>>(url)
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

export const useBookingApi = () => {
    return { addBooking, updateBooking }
}
    
