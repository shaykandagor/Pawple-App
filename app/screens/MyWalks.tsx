import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyWalks = () => {
  return (
    <View style={styles.container}>
      <Text>MyWalks</Text>
    </View>
  )
}

export default MyWalks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
})