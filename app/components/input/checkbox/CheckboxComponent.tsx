import { StyleSheet } from 'react-native'
import React from 'react'
import { Checkbox as PaperCheckbox } from 'react-native-paper'

interface CheckboxComponentProps {
  value?: boolean
  label: string
  onValueChange?: (isChecked: boolean) => void
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  value = false,
  onValueChange,
  label
}) => {
  return (
    <PaperCheckbox.Item
      label={label}
      status={value ? 'checked' : 'unchecked'}
      onPress={onValueChange ? () => onValueChange(!value) : undefined}
    />
  )
}

export default CheckboxComponent

const styles = StyleSheet.create({})
