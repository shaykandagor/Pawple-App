import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Colors } from '@util'

interface FloatingActionButtonProps {
  icon: string
  onPress: () => void
  style?: ViewStyle
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
      <Avatar.Icon
        icon={icon}
        size={56}
        style={{ backgroundColor: Colors.primary }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 5,
    backgroundColor: Colors.primary,
    borderRadius: 28,
    width: 56,
    height: 56,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  }
})

export default FloatingActionButton
