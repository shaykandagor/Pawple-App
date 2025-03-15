import { Colors } from '@util'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import FormSubmitButton from '../input/button/FormSubmitButton'
import FormDescChipSelector from '../input/chip_selector/FormDescChipSelector'
import LogoText from '../logo/LogoText'
import { useFormikContext } from 'formik'
import FormItemPicker from '@components/input/item_picker/FormItemPicker'
import { calculateAge } from 'app/util/helpers'

const PetRegistrationStep2 = () => {
  const sex = ['Male', 'Female']

  const size = ['Small', 'Medium', 'Large']

  const { errors, values } = useFormikContext<any>()
  const age = useMemo(() => {
    if (values.dob) {
      return calculateAge(new Date(values.dob))
    }
    return ''
  }, [values.dob])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.logo}>
          <LogoText width="100%" height={30} />
        </View>

        <View style={styles.heading}>
          {/* <Avatar.Image size={150} source={require('../assets/pet_profile.jpg')} /> */}
          <Text style={styles.text}>Please select the words that describe your pet</Text>
        </View>

        <View>
          <Text style={styles.setText}>
            {(values as any).name} {age}
          </Text>
        </View>

        <View style={styles.chips}>
          <FormDescChipSelector
            name="description"
            icon="check"
            mode="outlined"
            options={[
              'Potty trained',
              'Vaccinated',
              'Shy',
              'Fiesty',
              'Friendly',
              'Trained',
              'Neutered'
            ]}
          />
        </View>

        <View style={styles.itemPicker}>
          <FormItemPicker
            name="sex"
            variant="outlined"
            label="Sex"
            data={sex}
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
                <Text >{item}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.itemPicker}>
          <FormItemPicker
            name="size"
            variant="outlined"
            label="Size"
            data={size}
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
                <Text >{item}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.doneButton}>
          <FormSubmitButton mode="contained" title="All Done" />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.white,
    padding: 20
  },
  logo: {
    alignItems: 'center',
    padding: 20
  },
  heading: {
    alignItems: 'center',
    padding: 20
  },
  text: {
    color: Colors.neutralDark,
    padding: 10
  },
  setText: {
    fontSize: 30,
    color: Colors.textDark,
    fontWeight: '600',
    textAlign: 'center'
  },
  chips: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 10
  },
  itemPicker: {
    padding: 10
  },
  inputs: {
    marginBottom: 10
  },
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
})

export default PetRegistrationStep2
