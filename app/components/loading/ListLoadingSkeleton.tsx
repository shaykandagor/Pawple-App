import React, { useEffect, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'

const ListLoadingSkeleton = () => {
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
    <View style={styles.container}>
      <Animated.View style={[styles.avatarContainer, { opacity }]}>
        <Avatar.Image
          size={50}
          style={styles.avatar}
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.description, { opacity }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  avatarContainer: {
    marginRight: 15
  },
  avatar: {
    backgroundColor: '#ccc' // Placeholder color
  },
  textContainer: {
    flex: 1
  },
  title: {
    height: 15,
    backgroundColor: '#ccc', // Placeholder color
    marginBottom: 5,
    borderRadius: 4,
    width: '60%'
  },
  description: {
    height: 12,
    backgroundColor: '#ddd', // Placeholder color
    borderRadius: 4,
    width: '40%'
  }
})

export default ListLoadingSkeleton
