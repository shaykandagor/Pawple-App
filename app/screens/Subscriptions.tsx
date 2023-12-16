import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Subscriptions = () => {
  return (
    <View style={styles.container}>
      <Text>Subscriptions</Text>
    </View>
  )
}

export default Subscriptions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
})
