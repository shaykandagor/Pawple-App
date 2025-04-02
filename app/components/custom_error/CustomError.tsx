import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons' // You may need to install @expo/vector-icons
import { Colors } from '@util'

interface ErrorProps {
  errorMessage: string
}

const CustomError = ({ errorMessage }: ErrorProps) => {
  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={24} color={Colors.white} style={styles.icon} />
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.errorBg,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  icon: {
    marginRight: 10
  },
  errorText: {
    color: Colors.white,
    fontSize: 16,
    flex: 1
  },
  dismissButton: {
    marginLeft: 10
  }
})

export default CustomError
