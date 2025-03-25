import { BASE_URL } from 'app/util/constants'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

// Create an axios instance
// Set the base URL for the API
// Add an interceptor to add the token to the request headers
const httpClient = axios.create({ baseURL: BASE_URL })

httpClient.interceptors.request.use(
  async (config) => {
    try {
      const keyPrefix = 'secure_'
      const key = 'token'
      const valueKey = `${keyPrefix}${key}`
      const token = await SecureStore.getItemAsync(valueKey)
      if (token && !config.headers?.get('x-access-token')) {
        config.headers.set('x-access-token', JSON.parse(token))
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
