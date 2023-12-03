import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PaymentMethods = () => {
  return (
    <View style={styles.container}>
      <Text>PaymentMethods</Text>
    </View>
  )
}

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
})