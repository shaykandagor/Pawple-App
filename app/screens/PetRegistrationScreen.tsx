import FormSubmitButton from '@components/input/button/FormSubmitButton'
import PetRegistrationStep1 from '@components/pet_info/PetRegistrationStep1'
import PetRegistrationStep2 from '@components/pet_info/PetRegistrationStep2'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { mutate } from 'app/api/apiFetcher'
import { usePetApi } from 'app/api/pets'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import * as YUP from 'yup'
import { RootStackParamList } from '../../Navigation'
import Form from '../components/form/Form'
import { Pet } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import ClickButton from '@components/input/button/ClickButton'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// The PetRegistrationScreen component allows the user to register a new pet.
// The component uses the usePetApi hook to add or update a pet.
// The component uses the Formik library to handle form submission.
type Props = NativeStackScreenProps<RootStackParamList, 'PetRegistration'>

interface PetRegisterValues {
  photoUrl: string
  name: string
  birthDay: Date
  descriptions: string[]
  sex: string
  size: string
  type: string
}

const PetRegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const pet: Pet | undefined = (route?.params as any)?.pet
  const validationSchemer = YUP.object().shape({
    photoUrl: YUP.string().label('Image').required(),
    name: YUP.string().label('name').required(),
    birthDay: YUP.date().max(new Date()).label('Date of birth').required(),
    sex: YUP.string().label('sex').required(),
    size: YUP.string().label('size').required(),
    descriptions: YUP.array().of(YUP.string()).label('descriptions').required(),
    type: YUP.string().label('type').oneOf(['Dog', 'Cat']).required()
  })

  const [currentStep, setCurrentStep] = useState(1)
  const { addPet, updatePet } = usePetApi()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    value: any,
    { setErrors }: FormikHelpers<PetRegisterValues>
  ) => {
    setLoading(true)
    try {
      if (pet) {
        await updatePet(pet.id, value)
      } else {
        await addPet(value)
      }
      mutate('/pets')
      navigation.goBack()
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
        setErrors({ ...fieldErrors })
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Form<PetRegisterValues>
              initialValue={{
                photoUrl: pet?.photoUrl ? `${BASE_URL}/${pet.photoUrl}` : '',
                name: pet?.name ?? '',
                birthDay: pet?.birthDay ? new Date(pet?.birthDay) : new Date(),
                sex: pet?.sex ?? '',
                size: pet?.size ?? '',
                descriptions: pet?.descriptions ?? [],
                type: pet?.type ?? ''
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchemer}
            >
              {currentStep === 1 && (
                <PetRegistrationStep1
                  route={route}
                  navigation={navigation}
                  onNext={() => {
                    setCurrentStep(2)
                  }}
                />
              )}
              {currentStep === 2 && (
                <PetRegistrationStep2
                  onPrev={() => setCurrentStep(1)}
                  route={route}
                />
              )}
              {currentStep === 2 && (
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <ClickButton
                      mode="outlined"
                      title="Back"
                      onPress={() => setCurrentStep(1)}
                    />
                  </View>
                  <View style={styles.button}>
                    <FormSubmitButton
                      mode="contained"
                      title="All Done"
                      loading={loading}
                    />
                  </View>
                </View>
              )}
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
    padding: 20,
    paddingBottom: 150 // Add padding to ensure buttons are not hidden
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    flex: 1,
    marginHorizontal: 5
  }
})

export default PetRegisterScreen
