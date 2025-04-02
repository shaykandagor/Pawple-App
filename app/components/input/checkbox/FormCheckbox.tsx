import React from 'react'
import { useFormikContext } from 'formik'
import CheckboxComponent from './CheckboxComponent'

interface FormCheckboxProps {
  name: string
  label: string
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label }) => {
  const { values, setFieldValue } = useFormikContext()
  const _values: any = values

  const onPress = (isChecked: boolean) => {
    setFieldValue(name, isChecked)
  }

  return (
    <>
      <CheckboxComponent value={_values[name]} label={label} onValueChange={onPress} />
    </>
  )
}

export default FormCheckbox
