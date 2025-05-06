import ClickButton from '@components/input/button/ClickButton'
import FormSubmitButton from '@components/input/button/FormSubmitButton'
import FormCheckbox from '@components/input/checkbox/FormCheckbox'
import FormDateTimePicker from '@components/input/date_picker/FormDateTimePicker'
import FormTextInput from '@components/input/text_input/FormTextInput'
import { Colors } from '@util'
import { usePets } from 'app/api/pets'
import { useWalkDurations } from 'app/api/walks'
import { BASE_URL } from 'app/util/constants'
import { useFormikContext } from 'formik'
import React, { useMemo } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import { Avatar, Card, Divider, List, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

type ConfirmBookingStep3Props = {
  isSubmitting: boolean
  onPrev: () => void
}

interface FormValues {
  pickupAddress: {
    lat: number
    lng: number
    address: string
  }
  instructions?: string
  visitPark: boolean
  bringDisposableBags: boolean
  petId: string
  durationId: string
  pickupTime: Date
}

const ConfirmBookingStep3 = ({
  onPrev,
  isSubmitting
}: ConfirmBookingStep3Props) => {
  const { values, errors, setFieldValue } = useFormikContext<FormValues>()
  const { walkdurations } = useWalkDurations()
  const { pets } = usePets({ mine: 'true' })
  const selectedWalkDuration = useMemo(
    () => walkdurations.find((duration) => duration.id === values.durationId),
    [values.durationId, walkdurations]
  )
  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === values.petId),
    [values.petId, pets]
  )
  const screenHeight = Dimensions.get('screen').height

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust this value based on your layout
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Card
              style={[styles.cardContainer, { height: screenHeight * 0.3 }]}
            >
              <View style={{ width: '100%', height: '100%' }}>
                <List.Item
                  title={pets.find((pet) => pet.id === values.petId)?.name}
                  description={() => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: Colors.textDark, fontSize: 16 }}>
                        Duration{' '}
                      </Text>
                      <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>
                        {`${selectedWalkDuration?.duration} ${selectedWalkDuration?.units}`}
                      </Text>
                    </View>
                  )}
                  right={(props) => (
                    <Avatar.Image
                      {...props}
                      source={
                        selectedPet?.photoUrl
                          ? {
                              uri: `${BASE_URL}/${selectedPet.photoUrl}`
                            }
                          : require('../../assets/pet_placeholder.png')
                      }
                    />
                  )}
                />

                <Card.Content>
                  <Text style={{ color: Colors.textDark, fontSize: 16 }}>
                    Pick up
                  </Text>
                  <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>
                    The location where the dog walker will pick up your pet
                  </Text>
                </Card.Content>

                <Card style={styles.cardMap}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: values.pickupAddress.lat,
                      longitude: values.pickupAddress.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: values.pickupAddress.lat,
                        longitude: values.pickupAddress.lng
                      }}
                      title="Pickup Location"
                      description="Your pickup location"
                    />
                  </MapView>
                </Card>
              </View>
            </Card>
            <View style={styles.content}>
              <View style={styles.checkbox}>
                <Text
                  style={{
                    color: Colors.textDark,
                    fontSize: 20,
                    fontWeight: '500',
                    paddingBottom: 10
                  }}
                >
                  Pickup Time
                </Text>
                <FormDateTimePicker
                  name="pickupTime"
                  mode="datetime"
                  label="Pickup Time"
                  display="default"
                  formater={(date) => date.toLocaleString()}
                  variant="outlined"
                />
              </View>
              <View style={styles.checkbox}>
                <Text
                  style={{
                    color: Colors.textDark,
                    fontSize: 20,
                    fontWeight: '500'
                  }}
                >
                  Requests
                </Text>
                <FormCheckbox name="visitPark" label="Go to a dog park" />
                <FormCheckbox
                  name="bringDisposableBags"
                  label="Bring disposable bags"
                />

                <Divider />
                <Text
                  style={{
                    color: Colors.textDark,
                    fontSize: 20,
                    fontWeight: '500',
                    paddingBottom: 10,
                    paddingTop: 10
                  }}
                >
                  Special Instructions
                </Text>
                <FormTextInput
                  name="instructions"
                  placeholder="Type a custom instruction for your dog walker here"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.backButton}>
                <ClickButton mode="outlined" title="Back" onPress={onPrev} />
              </View>
              <View style={styles.bookButton}>
                <FormSubmitButton
                  mode="contained"
                  title="Book Now"
                  loading={isSubmitting}
                />
              </View>
            </View>
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
    paddingBottom: 150 // Add padding to ensure the last input is not hidden
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  bookButton: {
    padding: 10
  },
  backButton: {
    padding: 10,
    marginRight: 10
  },
  cardContainer: {
    margin: 20
  },
  cardMap: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  content: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    borderTopWidth: 10,
    borderTopColor: Colors.lightGray,
    borderBottomColor: Colors.lightGray,
    padding: 10
  },
  checkbox: {
    padding: 20
  }
})

export default ConfirmBookingStep3
