import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ErrorProps {
  errorMessage: string
}

const CustomError = ({ errorMessage }: ErrorProps) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
  errorText: {
    color: 'white',
    fontSize: 16
  }
})

export default CustomError
