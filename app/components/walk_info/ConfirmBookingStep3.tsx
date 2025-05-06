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
import { Dimensions, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import { Avatar, Card, Divider, List, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    <SafeAreaView style={{ flex: 1}} edges={['bottom', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Card style={[styles.cardContainer, { height: screenHeight * 0.3 }]}>
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

          {/*         <View style={styles.content}>
          <Text
            style={{
              color: Colors.textDark,
              fontSize: 20,
              fontWeight: '500',
              padding: 10
            }}
          >
            Payment
          </Text>

          <View style={styles.paymentContent}>
            <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>
              {`${selectedWalkDuration?.duration} ${selectedWalkDuration?.units}`}{' '}
              walk
            </Text>
            <Text
              style={{
                color: Colors.textDark,
                fontSize: 18,
                fontWeight: '500'
              }}
            >
              {
                walkdurations.find(
                  (duration) => duration.id === values.durationId
                )?.cost
              }{' '}
              €
            </Text>
          </View>

          <View style={styles.paymentContent}>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>
              Discount
            </Text>
            <Text
              style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}
            >
              -1.20€
            </Text>
          </View>
          <Divider />
          <View style={styles.paymentContent}>
            <Text
              style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}
            >
              TOTAL
            </Text>
            <Text
              style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}
            >
              6.80€
            </Text>
          </View>

          <View style={styles.confirmButton}>
            <FormSubmitButton mode="contained" title="Select Payment Mode" />
          </View>
        </View> */}
        </ScrollView>
        {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  bookButton: {
    padding: 10,
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
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  paymentContent: {
    padding: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ConfirmBookingStep3
