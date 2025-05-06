import FormItemPicker from '@components/input/item_picker/FormItemPicker'
import { Colors } from '@util'
import { calculateAge } from 'app/util/helpers'
import { useFormikContext } from 'formik'
import React, { useMemo } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import FormDescChipSelector from '../input/chip_selector/FormDescChipSelector'
import LogoText from '../logo/LogoText'
import { BASE_URL } from 'app/util/constants'
import { Pet } from 'app/types'
import { SafeAreaView } from 'react-native-safe-area-context'

type PetRegistrationStep2Props = {
  onPrev: () => void
  route: any
}

const PetRegistrationStep2: React.FC<PetRegistrationStep2Props> = ({
  route
}) => {
  const pet: Pet | undefined = (route?.params as any)?.pet
  const sex = ['Male', 'Female']

  const size = ['Small', 'Medium', 'Large']

  const { errors, values } = useFormikContext<any>()

  const age = useMemo(() => {
    return values.birthDay ? calculateAge(new Date(values.birthDay)) : null
  }, [values.birthDay])

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.logo}>
              <LogoText width="100%" height={30} />
            </View>

            <View style={styles.profilePhoto}>
              <Avatar.Image
                source={
                  pet?.photoUrl
                    ? {
                        uri: `${BASE_URL}/${pet.photoUrl}`
                      }
                    : require('../../assets/pet_placeholder.png')
                }
                size={100}
              />
            </View>

            <View style={styles.heading}>
              <Text style={styles.text}>Pet Profile</Text>
              <View>
                <Text style={styles.setText}>
                  {(values as any).name}, {age}
                </Text>
              </View>
              <Text style={styles.text}>
                Please select the words that describe your pet
              </Text>
            </View>

            <View style={styles.chips}>
              <FormDescChipSelector
                name="descriptions"
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
                    <IconButton icon="paw" />
                    <Text>{item}</Text>
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
                    <IconButton icon="paw" />
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.white
  },
  logo: {
    alignItems: 'center',
    padding: 20
  },
  profilePhoto: {
    alignItems: 'center',
    padding: 20
  },
  heading: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10
  },
  text: {
    color: Colors.neutralDark,
    padding: 20
  },
  setText: {
    fontSize: 20,
    color: Colors.textDark,
    fontWeight: '500',
    textAlign: 'center'
  },
  chips: {
    alignItems: 'center',
    padding: 15,
    marginBottom: 10
  },
  itemPicker: {
    padding: 10,
    marginBottom: 20
  }
})

export default PetRegistrationStep2
