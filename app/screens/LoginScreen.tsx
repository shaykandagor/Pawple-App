import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import LogoText from '../components/logo/LogoText'
import * as YUP from 'yup'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import FormTextInput from '../components/input/text_input/FormTextInput'
import Form from '../components/form/Form'
import { Colors } from '@util'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OpenRoutesParamList, RootStackParamList } from '../../Navigation'
import { Logo } from '@components/index'
import { SessionContext } from 'app/session/SessionContext'
import { useAuth } from 'app/api/auth'
import { FormikHelpers } from 'formik'
import useSecureStore from 'app/hooks/useSecureStore'

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
  const { session, setSession } = useContext(SessionContext)
  const { login } = useAuth()
  const { setValue } = useSecureStore('token', undefined)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (value: any, { setErrors }: FormikHelpers<LoginValues>) => {
    setLoading(true)
    try {
      const response = await login({ id: value.username, password: value.password })
      if (response.ok) {
        setSession({
          ...session,
          authenticated: true
        })
        setValue(response.headers.get('x-access-token'))
      } else if (response.status === 400) {
        const errors = await response.json()
        const fieldErrors = Object.entries(errors).reduce((prev, [key, value]) => {
          if (key === '_errors') {
            return prev
          }
          return { ...prev, [key]: ((value as any)._errors as string[]).join(';') }
        }, {})
        setErrors({ ...fieldErrors, username: (fieldErrors as any).id })
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        {/* <View style={styles.logo}>
          <LogoText width="100%" height={30} />
        </View> */}

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
          <FormSubmitButton mode="contained" title="Login" loading={loading} />
        </View>
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingTop: 50
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center'
  },
  logo: {
    alignItems: 'center',
    padding: 20
  },
  radioButton: {
    paddingLeft: 15
  },
  image: {
    alignItems: 'center',
    paddingBottom: 20
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
