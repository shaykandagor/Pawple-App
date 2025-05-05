import { StyleSheet, View, Platform, TouchableHighlight } from 'react-native'

import { default as React, useState } from 'react'
import {
  default as CommunityDateTimePicker,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { HelperText, TextInput } from 'react-native-paper'

// Define the DateTimePickerProps interface
interface DateTimePickerProps {
  name: string
  date: Date
  onDateChanged: (date: Date) => void
  formater?: (date: Date) => string
  label: string
  prefixIcon?: string
  surfixIcon?: string
  onPrefixIconPressed?: () => void
  onSurfixIconPressed?: () => void
  mode?: 'date' | 'time' | 'datetime'
  display?: 'default' | 'spinner' | 'calendar' | 'clock'
  variant?: 'flat' | 'outlined'
  error?: string
  helpText?: string
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  date,
  onDateChanged,
  formater,
  label,
  prefixIcon,
  surfixIcon,
  onPrefixIconPressed,
  onSurfixIconPressed,
  mode = 'date',
  display = 'default',
  variant = 'flat',
  error,
  helpText
}) => {
  const [isPickerShow, setIsPickerShow] = useState<boolean>(false)
  const [androidDateTime, setAndroidDateTime] = useState<{
    date: Date
    time: Date
    currentMode: 'date' | 'time'
  }>({
    date: date,
    time: date,
    currentMode: 'date'
  })

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) onDateChanged(date)
    setIsPickerShow(false)
    setAndroidDateTime({ date: date!, time: date!, currentMode: 'date' })
  }

  const toggleShowPicker = () => {
    setIsPickerShow(!isPickerShow)
  }

  return (
    <View>
      <TouchableHighlight onPress={toggleShowPicker}>
        <TextInput
          error={Boolean(error)}
          label={label}
          mode={variant}
          value={formater ? formater(date) : date.toISOString()}
          editable={false}
          left={
            prefixIcon && (
              <TextInput.Icon
                icon={prefixIcon}
                onPress={
                  onPrefixIconPressed ? onPrefixIconPressed : toggleShowPicker
                }
              />
            )
          }
          right={
            surfixIcon && (
              <TextInput.Icon
                icon={surfixIcon}
                onPress={
                  onSurfixIconPressed ? onSurfixIconPressed : toggleShowPicker
                }
              />
            )
          }
        />
      </TouchableHighlight>
      {(error || helpText) && (
        <HelperText type={error ? 'error' : 'info'} visible={Boolean(error)}>
          {error ? error : helpText}
        </HelperText>
      )}

      {Platform.OS === 'android' && isPickerShow && (
        <CommunityDateTimePicker
          display={display as any}
          mode={mode === 'datetime' ? androidDateTime.currentMode : mode}
          value={date}
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            if (mode === 'datetime') {
              if (androidDateTime.currentMode === 'date') {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  date: date || new Date(),
                  currentMode: 'time'
                }))
              }
              if (androidDateTime.currentMode === 'time') {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  time: date || new Date()
                }))
              }
              if (androidDateTime.currentMode === 'time') {
                onChange(
                  event,
                  new Date(
                    androidDateTime.date.getFullYear(),
                    androidDateTime.date.getMonth(),
                    androidDateTime.date.getDate(),
                    androidDateTime.time.getHours(),
                    androidDateTime.time.getMinutes(),
                    androidDateTime.time.getSeconds(),
                    androidDateTime.time.getMilliseconds()
                  )
                )
              }
            } else {
              onChange(event, date)
            }
          }}
        />
      )}
      {Platform.OS === 'ios' && isPickerShow && (
        <CommunityDateTimePicker
          display={display as any}
          mode={mode}
          value={date}
          onChange={onChange}
        />
      )}
    </View>
  )
}

export default DateTimePicker

const styles = StyleSheet.create({})
