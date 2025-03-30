import React from 'react'
import { useFormikContext } from 'formik'
import CardPicker, { CardPickerProps } from './CardPicker'

/**
 * CardPicker examples Q: Duration, R: number (value)
 */
interface FormCardPickerProps<T, Q>
  extends Pick<
    CardPickerProps<Q>,
    'label' | 'items' | 'titleExtractor' | 'valueExtractor' | 'subTitleExtractor' | 'renderTrailer'
  > {
  name: keyof T
}

/**
 * T: Form values type eg. { time: Duration, pet: string }
 * Q: type of one T value eg. Duration, has to have id: number
 */
const FormCardPicker = <T, Q>({ name, ...props }: FormCardPickerProps<T, Q>) => {
  const { values, setFieldValue, errors } = useFormikContext<T>()
  const error = errors[name]

  return (
    <CardPicker<Q>
      {...props}
      value={values[name]}
      onValueChange={(value) => setFieldValue(name as string, value)}
      error={error}
    />
  )
}

export default FormCardPicker
