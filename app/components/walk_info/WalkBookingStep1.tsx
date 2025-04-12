import ClickButton from '@components/input/button/ClickButton'
import FormCardPicker from '@components/input/card_picker/FormCardPicker'
import FormImageSelector from '@components/input/image_selector/FormImageSelector'
import { Colors } from '@util'
import { usePets } from 'app/api/pets'
import { useWalkDurations } from 'app/api/walks'
import { WalkDuration } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Text } from 'react-native-paper'

type Props = { onNext: () => void }

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
}

const WalkBookingStep1: React.FC<Props> = ({ onNext }) => {
  const { walkdurations } = useWalkDurations()
  const { pets } = usePets({ mine: 'true' })

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.bookText}>Book a walk</Text>
        <Text style={styles.selectText}>Select a pet</Text>
      </View>

      <View style={styles.petProfile}>
        <FormImageSelector
          name="petId"
          items={pets.map((pet) => ({
            ...pet,
            photoUrl: `${BASE_URL}/${pet.photoUrl}`
          }))}
          valueExtractor={(pet) => pet.id}
          imageExtractor={(pet) => pet.photoUrl}
        />
      </View>

      <View style={styles.heading}>
        <Text style={styles.selectText}>Select duration</Text>
      </View>
      <View style={styles.cardContainer}>
        <FormCardPicker<FormValues, WalkDuration>
          name="durationId"
          items={walkdurations}
          titleExtractor={({ duration, units }) => `${duration} ${units}`}
          valueExtractor={({ id }) => id}
          subTitleExtractor={() => ''}
          renderTrailer={({ cost }) => (
            <Text style={styles.cardText}>{`${cost} £`}</Text>
          )}
        />
      </View>
      <View style={styles.setPickButton}>
        <ClickButton
          mode="contained"
          title="Set up Pickup Address"
          onPress={onNext}
        />
      </View>

      <View style={styles.agreeText}>
        <Text style={styles.selectText}> By Proceeding you agree to the </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Pawple Service T&Cs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    height: '100%',
    width: '100%',
    padding: 15,
    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20
  },
  setPickButton: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  bookText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
    paddingBottom: 15
  },
  selectText: {
    fontSize: 14,
    color: Colors.textLight
  },
  petProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  agreeText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  linkText: {
    color: Colors.primary,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  cardText: {
    fontSize: 15,
    color: Colors.textGray
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold'
  }
})

export default WalkBookingStep1
