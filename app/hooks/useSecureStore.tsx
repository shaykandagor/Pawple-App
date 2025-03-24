import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

/* Saves a value to secure storage using a key.
If the value is null or undefined, it deletes the key from secure storage. */
async function save(key: string, value: any) {
  if (value !== null && value !== undefined)
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  else{
    await SecureStore.deleteItemAsync(key)
    
  }
}
/* Retrieves a value from secure storage using a key.
Parses the stored JSON string back into its original format. */
async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key)
  if (result !== null && result !== undefined) return JSON.parse(result)
}
/* 'Uses React's useState to manage the stored value in the component's state.
Uses useEffect to:
Retrieve the value from secure storage when the component mounts.
If no value is found, it sets the defaultValue in both state and secure storage.
Returns an object with:
value: The current value stored in state.
setValue: A function to update the value in both state and secure storage. */

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
