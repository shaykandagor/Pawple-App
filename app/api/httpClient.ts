import { BASE_URL } from 'app/util/constants'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const httpClient = axios.create({ baseURL: BASE_URL })

httpClient.interceptors.request.use(
  async (config) => {
    try {
      const keyPrefix = 'secure_'
      const key = 'token'
      const valueKey = `${keyPrefix}${key}`
      const token = await SecureStore.getItemAsync(valueKey)
      if (token && !config.headers?.get('x-access-token')) {
        config.headers.set('x-access-token', token)
      }
    } catch (error) {
      console.log('Error retrieving token', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default httpClient
