import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { Colors } from '@util'

interface CardProps {
  title?: string
  subTitle?: string
  mode?: 'elevated' | 'outlined' | 'contained'
  image: { uri: string } | string
  onPress?: () => void
}

const textStyle = { color: Colors.white }

const CustomCard: React.FC<CardProps> = ({
  title,
  subTitle,
  mode = 'contained',
  image,
  onPress
}) => {
  return (
    <Card mode={mode} onPress={onPress} style={styles.card}>
      <Card.Cover source={typeof image === 'string' ? { uri: image } : image} />
      <Card.Content style={styles.contentContainer}>
        {title && (
          <Text variant="titleLarge" style={textStyle}>
            {title}
          </Text>
        )}
        {subTitle && (
          <Text variant="titleMedium" style={textStyle}>
            {subTitle}
          </Text>
        )}
      </Card.Content>
    </Card>
  )
}

export default CustomCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 10
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'flex-end'
  }
})
