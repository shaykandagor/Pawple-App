import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'

const useLocate = () => {
  const [location, setLocation] = useState<Coordinate>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    ;(async () => {
      let { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      let _location = await getCurrentPositionAsync({})
      const { latitude, longitude } = _location.coords
      setLocation({ latitude, longitude })
    })()
  }, [])
  return { location, error }
}

export default useLocate

const styles = StyleSheet.create({})
