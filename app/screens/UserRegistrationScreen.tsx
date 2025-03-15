import Form from '@components/form/Form'
import FormItemPicker from '@components/input/item_picker/FormItemPicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { useAuth } from 'app/api/auth'
import useSecureStore from 'app/hooks/useSecureStore'
import useSession from 'app/session/useSession'
import { User } from 'app/types/session'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import * as YUP from 'yup'
import { OpenRoutesParamList } from '../../Navigation'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import FormTextInput from '../components/input/text_input/FormTextInput'
import LogoText from '../components/logo/LogoText'
import UserRegistrationFormPreferredSizeInput from '@components/auth/UserRegistrationFormPreferredSizeInput'

interface UserRegistrationValues {
  username: string
  email: string
  fullName: string
  role: string
  socialSecurityNumber: string
  password: string
  confirmpassword: string
  preferredSize?: string
  owner: boolean
}

const validationSchemer = YUP.object().shape({
  username: YUP.string().label('username').required(),
  email: YUP.string().label('email').required().email(),
  fullName: YUP.string().label('full name').required(),
  role: YUP.string().oneOf(['Owner', 'Walker']).label('role').required(),
  socialSecurityNumber: YUP.string().label('social security number').required(),
  password: YUP.string().label('password').required(),
  confirmPassword: YUP.string().label('confirm password').required(),
  owner: YUP.boolean().label('owner'),
  preferredSize: YUP.string().oneOf(['Small', 'Medium', 'Large']).label('preferred size')
})

type Props = NativeStackScreenProps<OpenRoutesParamList, 'UserRegistration'>

const UserRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const { session, setSession } = useSession()
  const { register } = useAuth()
  const { setValue } = useSecureStore('token', undefined)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (value: any, { setErrors }: FormikHelpers<UserRegistrationValues>) => {
    setLoading(true)
    try {
      const response = await register(value)
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
        const fieldErrors = Object.entries(errors).reduce((prev, [key, value]) => {
          if (key === '_errors') {
            return prev
          }
          return { ...prev, [key]: ((value as any)._errors as string[]).join(';') }
        }, {})
        setErrors({ ...fieldErrors, username: (fieldErrors as any).id })
      } else {
        // TODO: Handle other errors other than validation
      }
    } finally {
      setLoading(false)
    }
  }
  const role = ['Owner', 'Walker']

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        initialValue={{
          username: '',
          email: '',
          fullName: '',
          role: '',
          socialSecurityNumber: '',
          password: '',
          confirmPassword: '',
          preferredsize: '',
          owner: false
        }}
        onSubmit={handleSubmit as any}
        validationSchema={validationSchemer}
      >
        <View>
          <View style={styles.logo}>
            <LogoText width="100%" height={50} />
          </View>

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
                name="email"
                inputProps={{
                  label: 'Email Address',
                  mode: 'outlined',
                  inputMode: 'email'
                }}
              />
            </View>
            <View style={styles.inputs}>
              <FormTextInput
                name="fullName"
                inputProps={{
                  label: 'Full Name',
                  mode: 'outlined',
                  inputMode: 'text'
                }}
              />
            </View>
            <View style={styles.inputs}>
              <FormTextInput
                name="socialSecurityNumber"
                inputProps={{
                  label: 'Social Security Number',
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
            <View style={styles.inputs}>
              <FormTextInput
                name="confirmPassword"
                inputProps={{
                  label: 'Confirm Password',
                  mode: 'outlined',
                  secureTextEntry: true
                }}
              />
            </View>
            <View style={styles.itemPicker}>
              <FormItemPicker
                name="role"
                variant="outlined"
                label="Role"
                data={role}
                valueExtractor={(item) => item}
                labelExtractor={(item) => `${item}`}
                surfixIcon="chevron-down"
                renderItem={({ item }) => (
                  <View
                    style={{
                      alignItems: 'center',
                      margin: 5,
                      backgroundColor: Colors.lightGray,
                      flexDirection: 'row',
                      borderRadius: 10
                    }}
                  >
                    <IconButton icon="camera" />
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
            <UserRegistrationFormPreferredSizeInput />
          </View>
          <View style={styles.verifyButton}>
            <FormSubmitButton mode="contained" title="Create Account" loading={loading} />
          </View>
        </View>
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingHorizontal: 20 // Added horizontal padding for better spacing
  },
  logo: {
    alignItems: 'center',
    padding: 10
  },
  itemPicker: {
    marginBottom: 20 // Consistent margin for all inputs
  },
  radioButton: {
    paddingLeft: 15,
    marginBottom: 20 // Consistent margin for all inputs
  },
  inputsContainer: {
    paddingVertical: 20 // Vertical padding for better spacing
  },
  inputs: {
    marginBottom: 20
  },
  verifyButton: {
    paddingVertical: 20, // Reduced padding for a more balanced look
    paddingHorizontal: 40
  }
})

export default UserRegistrationScreen
