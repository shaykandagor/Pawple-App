import { Formik, FormikHelpers } from 'formik'
import React, { ReactNode } from 'react'

interface FormProps<T> {
  initialValue: T
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<unknown>
  validationSchema?: unknown
  children: ReactNode
}

function Form<T extends object>({
  initialValue,
  onSubmit,
  validationSchema,
  children
}: FormProps<T>) {
  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  )
}

export default Form
