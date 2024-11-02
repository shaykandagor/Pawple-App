import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as YUP from 'yup'
import { OpenRoutesParamList } from '../../Navigation'
import Form from '../components/form/Form'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import FormImagePicker from '../components/input/image_picker/FormImagePicker'
import FormRadioButton from '../components/input/radio_button/FormRadioCheckbox'
import FormTextInput from '../components/input/text_input/FormTextInput'
import LogoText from '../components/logo/LogoText'

interface RegistrationValues {
  image: string
  fullname: string
  email: string
  password: string
  owner: boolean
}

const validationSchemer = YUP.object().shape({
  image: YUP.string().label('Image').required(),
  fullname: YUP.string().label('full name').required(),
  email: YUP.string().label('email').required().email(),
  password: YUP.string().label('password').required(),
  owner: YUP.boolean().label('owner')
})

type Props = NativeStackScreenProps<OpenRoutesParamList, 'Registration'>

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form
        initialValue={
          {
            image: '',
            fullname: '',
            email: '',
            password: '',
            owner: false
          } as RegistrationValues
        }
        onSubmit={(value) => {
          console.log(value)
        }}
        validationSchema={validationSchemer}
      >
        <View style={styles.logo}>
          <LogoText width="100%" height={30} />
        </View>

        <View style={styles.image}>
          <FormImagePicker name="image" size={150} />
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputs}>
            <FormTextInput
              name="fullname"
              inputProps={{
                label: 'Full Name',
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
              name="password"
              inputProps={{
                label: 'Password',
                mode: 'outlined',
                secureTextEntry: true
              }}
            />
          </View>
        </View>

        <View style={styles.radioButton}>
          <FormRadioButton name="owner" label="I own a pet" />
        </View>

        <View style={styles.verifyButton}>
          <FormSubmitButton mode="contained" title="Verify Account" />
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

export default RegistrationScreen
