import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator
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
import { FormikHelpers } from 'formik'
import useSecureStore from 'app/hooks/useSecureStore'

type Props = { onNext: () => void }

interface FormValues {
  time: string
  pet: string
}

const WalkBookingStep1: React.FC<Props> = ({ onNext }) => {
  const validationSchema = YUP.object().shape({
    time: YUP.string().label('time').required(),
    pet: YUP.string().label('pet').required()
  })

  const { walkdurations } = useWalkDurations()
  const { pets } = usePets({ mine: 'true' })
  const [loading, setLoading] = useState(false)
  const { value: token } = useSecureStore('authToken', '') // Retrieve token securely

  const handleSubmit = async (value: FormValues, { setErrors }: FormikHelpers<FormValues>) => {
    setLoading(true)
    try {
      if (!token) {
        throw new Error('Authentication token is missing')
      }
      
      const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(value)
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 400) {
          const fieldErrors = Object.entries(errorData).reduce((prev, [key, value]) => {
            if (key === '_errors') return prev
            return { ...prev, [key]: ((value as any)._errors as string[]).join(';') }
          }, {})
          setErrors(fieldErrors)
        } else {
          throw new Error(errorData.message || 'Something went wrong')
        }
      } else {
        const result = await response.json()
        console.log('Booking successful:', result)
        onNext()
      }
    } catch (error: any) {
      console.error('Error during booking:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => (
    <View>
      <View style={styles.heading}>
        <Text style={styles.bookText}>Book a walk</Text>
        <Text style={styles.selectText}>Select a pet</Text>
      </View>
      
      <Form
        initialValue={{ time: '', pet: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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

        <View style={styles.agreeText}>
          <Text style={styles.selectText}> By Proceeding you agree to the </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Pawple Service T&Cs</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        )}
      </Form>
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => renderContent()}
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
