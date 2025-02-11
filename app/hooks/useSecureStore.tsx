import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

async function save(key: string, value: any) {
  if (value !== null && value !== undefined)
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  else{
    await SecureStore.deleteItemAsync(key)
    
  }
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key)
  if (result !== null && result !== undefined) return JSON.parse(result)
}

const useSecureStore = (key: string, defaultValue: any) => {
  const keyPrefix = 'secure_'
  const valueKey = `${keyPrefix}${key}`
  const [storedValue, setStoredValue] = useState(defaultValue)
  useEffect(() => {
    getValueFor(valueKey).then((value) => {
      if (value !== null && value !== undefined) {
        setStoredValue(value)
      } else {
        setStoredValue(defaultValue)
        if (defaultValue !== null && defaultValue !== undefined) {
          save(valueKey, defaultValue)
        }
      }
    })
  }, [])

  return {
    value: storedValue,setValue: (value: any) => {
      setStoredValue(value)
      save(valueKey, value)
    }
  }
}

export default useSecureStore
