import React from 'react'
import { StyleSheet } from 'react-native'
import ChipSelector from './ChipSelector'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'
import { useFormikContext } from 'formik'

interface FormTypeChipSelectorProps {
  name: string
  options: string[]
  mode: 'flat' | 'outlined'
  icon: IconSource
  multiple?: boolean
}

const FormTypeChipSelector: React.FC<FormTypeChipSelectorProps> = ({ ...props }) => {
  const { name, options, mode, icon, multiple } = props

  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext()
  const _values: any = values
  const _errors: any = errors

  const handleSelect = (selected: string[]) => {
    if (multiple) {
      // Ensure only one option is selected at a time
      setFieldValue(name, selected.length > 0 ? [selected[selected.length - 1]] : [])
    } else {
      setFieldValue(name, selected.length > 0 ? selected[selected.length - 1] : '')
    }
    setFieldTouched(name, true)
  }

  return (
    <ChipSelector
      options={options}
      selectedOptions={_values[name] ? (multiple ? _values[name] : [_values[name]]) : []}
      onSelect={handleSelect}
      mode={mode}
      icon={icon}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FormTypeChipSelector
