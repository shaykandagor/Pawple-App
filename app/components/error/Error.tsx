import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '@util'
import React from 'react'
import { FormikErrors } from 'formik'

interface Props {
  error: string | FormikErrors<unknown>
}

/**
 * TODO: Make nicer. :)
 */
export const Error = ({ error }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {typeof error === 'string' ? error : Object.values(error).join('\n')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    backgroundColor: Colors.errorBg,
    padding: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.error
  },
  text: {
    fontSize: 18,
    color: Colors.error
  }
})
