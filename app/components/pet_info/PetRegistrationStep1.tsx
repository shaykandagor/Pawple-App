import FormChipSelector from '@components/input/chip_selector/FormChipSelector'
import FormDateTimePicker from '@components/input/date_picker/FormDateTimePicker'
import FormImagePicker from '@components/input/image_picker/FormImagePicker'
import FormTextInput from '@components/input/text_input/FormTextInput'
import LogoText from '@components/logo/LogoText'
import { Colors } from 'app/util/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

type Props = { onNext: () => void }

const PetRegistrationStep1: React.FC<Props> = ({ onNext }) => {
  const options = ['Dog', 'Cat']
  return (
    <View>
      <View style={styles.logo}>
        <LogoText width="100%" height={30} />
      </View>
      <View style={styles.image}>
        <FormImagePicker name="image" size={150} />
      </View>
      <View>
        <Text style={styles.setText}>Set up your pet</Text>
      </View>
      <View style={styles.inputs}>
        <FormTextInput
          name="name"
          inputProps={{ label: 'Name', mode: 'outlined', inputMode: 'text' }}
        />
      </View>

      <View style={styles.inputs}>
        <FormDateTimePicker
          name="dob"
          formater={(date) => date.toLocaleDateString()}
          label="Date of birth"
          prefixIcon="calendar"
          surfixIcon="chevron-down"
          mode="date"
          display="default"
          variant="outlined"
        />
      </View>

      <View style={styles.chips}>
        <FormChipSelector name="type" icon="check" mode="outlined" options={options} />
      </View>

      <View style={styles.nextButton}>
        <Button mode="contained" onPress={onNext}>
          Next
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
export default PetRegistrationStep1
