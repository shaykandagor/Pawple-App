import { FormSubmitButton } from '@components/index'
import FormImagePicker from '@components/input/image_picker/FormImagePicker'
import FormTextInput from '@components/input/text_input/FormTextInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { RootStackParamList } from 'Navigation'
import { useAuth } from 'app/api/auth'
import useSession from 'app/session/useSession'
import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { mutate } from 'swr'
import * as YUP from 'yup'
import LogoText from '../components/logo/LogoText'
import { HOME } from './ScreenNames'

interface UpdateProfileValues {
  image: string
  username: string
  email: string
  fullName: string
  socialSecurityNumber: string
}

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>

const UpdateProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    session: { user }
  } = useSession()

  const validationSchemer = YUP.object().shape({
    username: YUP.string().label('username').required(),
    email: YUP.string().label('email').required().email(),
    fullName: YUP.string().label('full name').required(),
    socialSecurityNumber: YUP.string()
      .label('social security number')
      .required()
  })
  const [loading, setLoading] = useState(false)
  const { updateUserInfo } = useAuth() // Ensure this is destructured correctly

  const handleSubmit = async (
    value: any,
    { setErrors }: FormikHelpers<UpdateProfileValues>
  ) => {
    setLoading(true)
    try {
      if (user) {
        await updateUserInfo(user.id, value) // Call the API to update user info
      }
      mutate(`/api/users/${user?.id}`) // Update the SWR cache
      navigation.navigate(HOME) // Navigate back to the home screen
    } catch (error) {
      console.error('Error updating profile:', error)
      // Optionally, show an error message to the user
    }
  }

  return (
    <Formik
      initialValues={{
        image: user?.photoUrl || '',
        username: user?.username || '',
        email: user?.email || '',
        fullName: user?.fullName || '',
        socialSecurityNumber: user?.socialSecurityNumber || ''
      }}
      validationSchema={validationSchemer}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logo}>
            <LogoText width={150} height={150} />
          </View>
          <View style={styles.profileImage}>
            <FormImagePicker name="image" size={150} />
          </View>
          <View style={styles.inputs}>
            <FormTextInput
              name="fullName"
              inputProps={{
                label: 'Full Name',
                mode: 'outlined',
                inputMode: 'text',
                value: values.fullName,
                onChangeText: handleChange('fullName')
              }}
            />
          </View>
          <View style={styles.inputs}>
            <FormTextInput
              name="username"
              inputProps={{
                label: 'Username',
                mode: 'outlined',
                inputMode: 'text',
                value: values.username,
                onChangeText: handleChange('username')
              }}
            />
          </View>
          <View style={styles.inputs}>
            <FormTextInput
              name="email"
              inputProps={{
                label: 'Email',
                mode: 'outlined',
                inputMode: 'email',
                value: values.email,
                onChangeText: handleChange('email')
              }}
            />
          </View>
          <View style={styles.inputs}>
            <FormTextInput
              name="socialSecurityNumber"
              inputProps={{
                label: 'Social Security Number',
                mode: 'outlined',
                inputMode: 'text',
                value: values.socialSecurityNumber,
                onChangeText: handleChange('socialSecurityNumber')
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
        </ScrollView>
      )}
    </Formik>
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
