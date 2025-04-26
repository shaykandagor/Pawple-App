import { FormSubmitButton } from '@components/index'
import FormImagePicker from '@components/input/image_picker/FormImagePicker'
import FormTextInput from '@components/input/text_input/FormTextInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { RootStackParamList } from 'Navigation'
import useSession from 'app/session/useSession'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { mutate } from 'swr'
import * as YUP from 'yup'
import LogoText from '../components/logo/LogoText'
import Form from '../components/form/Form'
import { FormikHelpers } from 'formik'
import { BASE_URL } from 'app/util/constants'
import { useUserApi } from 'app/api/users'

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>
interface UpdateProfileValues {
  photoUrl: string
  username: string
  email: string
  fullName: string
  socialSecurityNumber: string
}

const UpdateProfileScreen: React.FC<Props> = ({ navigation }) => {
  // The user object is retrieved from the session.
  // If the user object is not found, it will be undefined.
  const {
    session: { user }
  } = useSession()
  const validationSchemer = YUP.object().shape({
    username: YUP.string().label('username').required(),
    email: YUP.string().label('email').required().email(),
    photoUrl: YUP.string().label('photoUrl'),
    fullName: YUP.string().label('full name').required(),
    socialSecurityNumber: YUP.string()
      .label('social security number')
      .required()
  })
  const [loading, setLoading] = useState(false)
  const { updateProfile } = useUserApi()
  const { setSession, session } = useSession()

  const handleSubmit = async (
    value: any,
    { setErrors }: FormikHelpers<UpdateProfileValues>
  ) => {
    setLoading(true)
    try {
      if (user) {
        console.log('session', session)
        const updatedUser = await updateProfile(value)
        console.log('updatedUser', updatedUser)
        setSession({
          ...session,
          user: updatedUser
        })
        console.log('session after update', session)
        navigation.goBack()
      }
    } catch (error: any) {
      console.log('Error during profile update:', error)

      if (error.response) {
        // Handle Axios errors
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
          setErrors({ ...fieldErrors })
        } else {
          console.log('Unhandled server error:', error.response.data)
          // TODO: Handle other server errors
        }
      } else {
        // Handle non-Axios errors
        console.error('Unexpected error:', error.message || error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form<UpdateProfileValues>
        initialValue={{
          photoUrl: user?.photoUrl ? `${BASE_URL}/${user.photoUrl}` : '',
          username: user?.username ?? '',
          email: user?.email ?? '',
          fullName: user?.fullName ?? '',
          socialSecurityNumber: user?.socialSecurityNumber ?? ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemer}
      >
        <View>
          <View style={styles.logo}>
            <LogoText width={150} height={150} />
          </View>
          <View style={styles.profileImage}>
            <FormImagePicker name="photoUrl" size={150} />
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
                label: 'Email',
                mode: 'outlined',
                inputMode: 'email'
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
          <View style={styles.updateButtonContainer}>
            <FormSubmitButton
              mode="contained"
              title="Update Profile"
              loading={loading}
            ></FormSubmitButton>
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
    padding: 20
  },
  logo: {
    alignItems: 'center'
  },
  inputs: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  profileImage: {
    alignSelf: 'center'
  },
  updateButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
})

export default UpdateProfileScreen
