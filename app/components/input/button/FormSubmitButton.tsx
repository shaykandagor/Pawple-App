import React from 'react'

import { useFormikContext } from 'formik'
import { ClickButtonProps } from '@components/input/button/ClickButton'
import ClickButton from '@components/input/button/ClickButton'

const FormSubmitButton: React.FC<ClickButtonProps> = (props) => {
  const { handleSubmit } = useFormikContext()
  return <ClickButton {...props} onPress={() => handleSubmit()} />
}

export default FormSubmitButton
