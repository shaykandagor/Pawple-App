import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import React, {useState} from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import * as YUP from 'yup'
import { RootStackParamList } from '../../Navigation'
import Form from '../components/form/Form'
import PetRegistrationStep1 from '@components/pet_info/PetRegistrationStep1'
import PetRegistrationStep2 from '@components/pet_info/PetRegistrationStep2'
import {PET_INFORMATION} from './ScreenNames'

type Props = NativeStackScreenProps<RootStackParamList, 'PetRegistration'>

interface PetRegisterValues {
  image: string
  name: string
  dob: Date
  description: string[]
  sex: string
  size: string
  type: string
}

const PetRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const validationSchemer = YUP.object().shape({
    image: YUP.string().label('Image').required(),
    name: YUP.string().label('name').required(),
    dob: YUP.date().max(new Date()).label('Date of birth').required(),
    sex: YUP.string().label('sex').required(),
    size: YUP.string().label('size').required(),
    description: YUP.array().of(YUP.string()).label('description').required(),
    type: YUP.string().label("type").oneOf(['Dog', 'Cat']).required(),
  })

  const [currentStep, setCurrentStep] = useState(1)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Form<PetRegisterValues>
        initialValue={{
          image: '',
          name: '',
          dob: new Date(),
          sex: '',
          size: '',
          description: [],
          type: "",
        }}
        onSubmit={(value) => {
          navigation.navigate(PET_INFORMATION)
          console.log('Pet Register Value', value)
        }}
        validationSchema={validationSchemer}
      >
        {currentStep === 1 && <PetRegistrationStep1 onNext={() => {setCurrentStep(2)}} />} 
        {currentStep === 2 && <PetRegistrationStep2 />} 
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
