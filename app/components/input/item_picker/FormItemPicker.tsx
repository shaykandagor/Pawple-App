import { useFormikContext } from 'formik'
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { HelperText, TextInputProps } from 'react-native-paper'
import ItemPicker from './ItemPicker'

interface FormItemPickerProps {
  name: string
  data?: any[]
  labelExtractor?: (item: any) => string
  valueExtractor: (item: any) => any
  renderItem: ({
    item,
    index,
    separators
  }: {
    item: any
    index: number
    separators: {
      highlight: () => void
      unhighlight: () => void
      updateProps: (select: 'leading' | 'trailing', newProps: any) => void
    }
  }) => ReactNode
  label?: string
  prefixIcon?: string
  surfixIcon?: string
  onSurfixIconPressed?: () => void
  onPrefixIconPressed?: () => void
  variant?: 'flat' | 'outlined'
  error?: string
  helpText?: string
  horizontal?: boolean
  columnCount?: number
  searchable?: boolean
  searchStyle?: TextInputProps
  contentContainerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
}

const FormItemPicker: React.FC<FormItemPickerProps> = ({ ...props }) => {
  const { values, setFieldValue, errors } = useFormikContext()
  const _values: any = values
  const _errors: any = errors
  return (
    <>
      <ItemPicker
        {...props}
        item={_values[props.name]}
        onItemChanged={(item) => setFieldValue(props.name, item)}
        error={_errors[props.name]}
      />
      {(_errors[props.name] || props.helpText) && (
        <HelperText type={_errors[props.name] ? 'error' : 'info'} visible={Boolean(errors)}>
          {_errors[props.name] ? _errors[props.name] : props.helpText}
        </HelperText>
      )}
    </>
  )
}

export default FormItemPicker

const styles = StyleSheet.create({})
