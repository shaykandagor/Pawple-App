import FormImagePicker from '@components/input/image_picker/FormImagePicker'
import FormTextInput from '@components/input/text_input/FormTextInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { mutate } from 'swr'
import * as YUP from 'yup'
import LogoText from '../components/logo/LogoText'
import { Button } from 'react-native-paper'
import { HOME } from './ScreenNames'
import { RootStackParamList } from 'Navigation'
import { useAuth } from 'app/api/auth'
import useSession from 'app/session/useSession'

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
    socialSecurityNumber: YUP.string().label('social security number').required()
  })

  const { updateUserInfo } = useAuth() // Ensure this is destructured correctly

  const handleSubmit = async (value: UpdateProfileValues) => {
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
              style={styles.inputSpacing}
            />
            <FormTextInput
              name="username"
              inputProps={{
                label: 'Username',
                mode: 'outlined',
                inputMode: 'text',
                value: values.username,
                onChangeText: handleChange('username')
              }}
              style={styles.inputSpacing}
            />
            <FormTextInput
              name="email"
              inputProps={{
                label: 'Email',
                mode: 'outlined',
                inputMode: 'email',
                value: values.email,
                onChangeText: handleChange('email')
              }}
              style={styles.inputSpacing}
            />
            <FormTextInput
              name="socialSecurityNumber"
              inputProps={{
                label: 'Social Security Number',
                mode: 'outlined',
                inputMode: 'text',
                value: values.socialSecurityNumber,
                onChangeText: handleChange('socialSecurityNumber')
              }}
              style={styles.inputSpacing}
            />
          </View>
          <View style={styles.resendButtonContainer}>
            <Button mode="contained" onPress={handleSubmit}>
              Update Profile
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white
  },
  logo: {
    alignItems: 'center'
  },
  inputs: {
    padding: 10,
    marginBottom: 20
  },
  inputSpacing: {
    marginBottom: 20
  },
  profileImage: {
    alignSelf: 'center'
  },
  resendButtonContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20
  }
})

export default UpdateProfileScreen
