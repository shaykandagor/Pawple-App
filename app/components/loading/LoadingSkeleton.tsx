import React, { useState, useEffect } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'

const LoadingSkeleton = ({ size = 50 }) => {
  const opacity = useState(new Animated.Value(0))[0]

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    )
    animation.start()

    return () => animation.stop()
  }, [opacity])

  return (
    <View style={[styles.container]}>
      <Animated.View style={{ opacity }}>
        <Avatar.Image
          source={{ uri: 'https://placehold.co/300x300' }} // Placeholder image
          size={size}
          style={styles.avatar}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  avatarContainer: {
    marginHorizontal: 10 // Adjust the spacing as needed
  },
  avatar: {
    backgroundColor: '#ccc' // Adjust the color as needed
  }
})

export default LoadingSkeleton
