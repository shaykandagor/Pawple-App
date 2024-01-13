import React from 'react'
import DateTimePicker from './DateTimePicker'
import { useFormikContext } from 'formik'
import { FormDateTimePickerProps } from '@components/input/date_picker/types.d'

const FormDateTimePicker = <T,>({ ...props }: FormDateTimePickerProps<T>) => {
  const { values, setFieldValue, errors } = useFormikContext<T>()
  return (
    <DateTimePicker
      {...props}
      date={new Date(values[props.name] as string)}
      onDateChanged={(date: Date) => setFieldValue(props.name as string, date.toISOString())}
      error={errors[props.name] as string}
    />
  )
}

export default FormDateTimePicker
