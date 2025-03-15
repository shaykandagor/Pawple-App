import FormSubmitButton from '@components/input/button/FormSubmitButton'
import PetRegistrationStep1 from '@components/pet_info/PetRegistrationStep1'
import PetRegistrationStep2 from '@components/pet_info/PetRegistrationStep2'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { mutate } from 'app/api/apiFetcher'
import { usePetApi } from 'app/api/pets'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as YUP from 'yup'
import { RootStackParamList } from '../../Navigation'
import Form from '../components/form/Form'
import { Pet } from 'app/types'
import { BASE_URL } from 'app/util/constants'

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

  const handleSubmit = async (value: any, { setErrors }: FormikHelpers<PetRegisterValues>) => {
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
      console.log(error?.response?.data)
      if (error.response.status === 400) {
        const errors = await error.response.data
        const fieldErrors = Object.entries(errors).reduce((prev, [key, value]) => {
          if (key === '_errors') {
            return prev
          }
          return { ...prev, [key]: ((value as any)._errors as string[]).join(';') }
        }, {})
        setErrors({ ...fieldErrors })
      } else {
        // TODO: Handle other errors other than validation
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            onNext={() => {
              setCurrentStep(2)
            }}
          />
        )}
        {currentStep === 2 && <PetRegistrationStep2 />}
        {currentStep === 2 && (
          <View style={styles.doneButton}>
            <FormSubmitButton mode="contained" title="All Done" loading={loading} />
          </View>
        )}
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
    padding: 20
  },
  image: {
    alignItems: 'center'
  },
  setText: {
    fontSize: 30,
    color: Colors.textDark,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20
  },
  inputs: {
    padding: 10,
    marginBottom: 20
  },
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  chips: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20
  },
  nextButton: {
    padding: 15
  }
})

export default PetRegisterScreen
