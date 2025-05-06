import { Logo } from '@components/index'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { useAuth } from 'app/api/auth'
import useSecureStore from 'app/hooks/useSecureStore'
import useSession from 'app/session/useSession'
import { User } from 'app/types/session'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import * as YUP from 'yup'
import { OpenRoutesParamList } from '../../Navigation'
import Form from '../components/form/Form'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import FormTextInput from '../components/input/text_input/FormTextInput'
import LogoText from '../components/logo/LogoText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

interface LoginValues {
  username: string
  password: string
}

const validationSchemer = YUP.object().shape({
  username: YUP.string().label('username').required(),
  password: YUP.string().label('password').required()
})

type Props = NativeStackScreenProps<OpenRoutesParamList, 'Login'>

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { session, setSession } = useSession()
  const { login } = useAuth()
  const { setValue } = useSecureStore('token', undefined)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    value: any,
    { setErrors }: FormikHelpers<LoginValues>
  ) => {
    setLoading(true)
    try {
      const response = await login({
        id: value.username,
        password: value.password
      })
      const user: User = response.data.user
      setSession({
        ...session,
        authenticated: true,
        user
      })
      setValue(response?.headers?.['x-access-token'])
    } catch (error: any) {
      if (error.response.status === 400) {
        const errors = await error.response.data
        const fieldErrors = Object.entries(errors).reduce(
          (prev, [key, value]) => {
            if (key === '_errors') {
              return prev
            }
            return {
              ...prev,
              [key]: ((value as any)._errors as string[]).join(';')
            }
          },
          {}
        )
        setErrors({ ...fieldErrors, username: (fieldErrors as any).id })
      } else {
        // TODO: Handle other errors other than validation
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust this value
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Logo width={200} height={200} />
              <LogoText width={120} height={120} />
            </View>
            <Form
              initialValue={
                {
                  username: '',
                  password: ''
                } as LoginValues
              }
              onSubmit={handleSubmit}
              validationSchema={validationSchemer}
            >
              <View style={styles.inputsContainer}>
                <View style={styles.inputs}>
                  <FormTextInput
                    name="username"
                    inputProps={{
                      label: 'Username',
                      mode: 'outlined',
                      inputMode: 'text'
                    }}
                  />
                </View>
                <View style={styles.inputs}>
                  <FormTextInput
                    name="password"
                    inputProps={{
                      label: 'Password',
                      mode: 'outlined',
                      secureTextEntry: true
                    }}
                  />
                </View>
              </View>

              <View style={styles.verifyButton}>
                <FormSubmitButton
                  mode="contained"
                  title="Login"
                  loading={loading}
                />
              </View>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingBottom: 100
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center'
  },
  inputsContainer: {
    padding: 20
  },
  inputs: {
    marginBottom: 30
  },
  verifyButton: {
    padding: 40
  }
})

export default LoginScreen
