import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native'
import { Text } from 'react-native-paper'
import Form from '@components/form/Form'
import FormCardPicker from '@components/input/card_picker/FormCardPicker'
import FormImageSelector from '@components/input/image_selector/FormImageSelector'
import { Colors } from '@util'
import { usePets } from 'app/api/pets'
import { useWalkDurations } from 'app/api/walks'
import { WalkDuration } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import * as YUP from 'yup'

type Props = { onNext: () => void }

interface FormValues {
  time: string
  pet: string
}

const WalkBookingStep1: React.FC<Props> = ({ onNext }) => {
  const validationSchemer = YUP.object().shape({
    time: YUP.string().label('time').required(),
    pet: YUP.string().label('pet').required()
  })
  const { walkdurations } = useWalkDurations()
  const { pets } = usePets({
    mine: 'true'
  })

  const renderContent = () => (
    <View>
      {/* Heading */}
      <View style={styles.heading}>
        <Text style={styles.bookText}>Book a walk</Text>
        <Text style={styles.selectText}>Select a pet</Text>
      </View>

      {/* Form */}
      <Form
        initialValue={{
          time: '',
          pet: ''
        }}
        onSubmit={(value) => {
          console.log(value)
          onNext()
        }}
        validationSchema={validationSchemer}
      >
        {/* Pet Selector */}
        <View style={styles.petProfile}>
          <FormImageSelector
            name="pet"
            items={pets.map((pet) => ({
              ...pet,
              photoUrl: `${BASE_URL}/${pet.photoUrl}`
            }))}
            valueExtractor={(pet) => pet.id}
            imageExtractor={(pet) => pet.photoUrl}
          />
        </View>

        {/* Duration Selector */}
        <View style={styles.heading}>
          <Text style={styles.selectText}>Select duration</Text>
        </View>
        <View style={styles.cardContainer}>
          <FormCardPicker<FormValues, WalkDuration>
            name="time"
            items={walkdurations}
            titleExtractor={({ duration, units }) => `${duration} ${units}`}
            valueExtractor={({ id }) => id}
            subTitleExtractor={() => ''}
            renderTrailer={({ cost }) => <Text style={styles.cardText}>{`${cost} £`}</Text>}
          />
        </View>
      </Form>

      {/* Terms and Conditions */}
      <View style={styles.agreeText}>
        <Text style={styles.selectText}> By Proceeding you agree to the </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Pawple Service T&Cs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={[{ key: 'content' }]} // Dummy data to render the content
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollContent}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20
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
  }
})

export default WalkBookingStep1
