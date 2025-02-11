import FormItemPicker from '@components/input/item_picker/FormItemPicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import * as YUP from 'yup'
import { OpenRoutesParamList } from '../../Navigation'
import { Formik } from 'formik'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import FormRadioButton from '../components/input/radio_button/FormRadioCheckbox'
import FormTextInput from '../components/input/text_input/FormTextInput'
import LogoText from '../components/logo/LogoText'

interface UserRegistrationValues {
  username: string
  email: string
  fullname: string
  role: string
  socialsecuritynumber: string
  password: string
  confirmpassword: string
  preferredsize?: string
  owner: boolean
}

const validationSchemer = YUP.object().shape({
  username: YUP.string().label('username').required(),
  email: YUP.string().label('email').required().email(),
  fullname: YUP.string().label('full name').required(),
  role: YUP.string().label('role').required(),
  socialsecuritynumber: YUP.string().label('social security number').required(),
  password: YUP.string().label('password').required(),
  confirmPassword: YUP.string().label('confirm password').required(),
  owner: YUP.boolean().label('owner'),
  preferredSize: YUP.string().label('preferred size')
})


type Props = NativeStackScreenProps<OpenRoutesParamList, 'UserRegistration'>

const UserRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const role = [
    { id: 1, name: 'Owner' },
    { id: 2, name: 'Walker' }
  ]

  const preferredSize = [
    { id: 1, name: 'Small' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Large' }
  ]

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          fullname: '',
          role: '',
          socialsecuritynumber: '',
          password: '',
          confirmpassword: '',
          preferredsize: '',
          owner: false
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={validationSchemer}
      >
        {({ values, setFieldValue, errors }) => (
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
                  name="socialsecuritynumber"
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
                  name="confirmpassword"
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
                  valueExtractor={(item) => item?.id}
                  labelExtractor={(item) => `${item?.name}`}
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
                      <IconButton icon={item.icon} />
                      <Text style={{}}>{item.name}</Text>
                      <Text style={{}}>{item.label}</Text>
                    </View>
                  )}
                  value={values.role}
                  onValueChange={(value) => setFieldValue('role', value)}
                  error={errors.role}
                />
              </View>
              <View style={styles.itemPicker}>
                <FormItemPicker
                  name="preferredsize"
                  variant="outlined"
                  label="Preferred Size"
                  data={preferredSize}
                  valueExtractor={(item) => item?.id}
                  labelExtractor={(item) => `${item?.name}`}
                  surfixIcon="chevron-down"
                  disabled={values.role === 'Owner'} // Disable if role is Owner
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
                      <IconButton icon={item.icon} />
                      <Text style={{}}>{item.name}</Text>
                      <Text style={{}}>{item.label}</Text>
                    </View>
                  )}
                  value={values.preferredsize}
                  onValueChange={(value) => setFieldValue('preferredsize', value)}
                  error={errors.preferredsize}
                />
              </View>
            </View>

            <View style={styles.radioButton}>
              <FormRadioButton name="owner" label="I own a pet" />
            </View>

            <View style={styles.verifyButton}>
              <FormSubmitButton mode="contained" title="Create Account" />
            </View>
          </View>
        )}
      </Formik>
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
    paddingHorizontal: 40,
  }
})

export default UserRegistrationScreen
