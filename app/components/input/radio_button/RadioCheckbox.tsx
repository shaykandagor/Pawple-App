import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton as PaperRadioButton } from 'react-native-paper'

interface RadioCheckboxProps {
  value?: boolean
  label: string
  onValueChange?: (isChecked: boolean) => void
}

const RadioCheckbox: React.FC<RadioCheckboxProps> = ({ value = false, onValueChange, label }) => {
  return (
    <PaperRadioButton.Item
      label={label}
      value=""
      status={value ? 'checked' : 'unchecked'}
      onPress={onValueChange ? () => onValueChange(!value) : undefined}
    />
  )
}

export default RadioCheckbox

const styles = StyleSheet.create({})
