import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import * as YUP from 'yup'
import Form from '@components/form/Form'
import FormSubmitButton from '@components/input/button/FormSubmitButton'
import WalkBookingStep1 from '@components/walk_info/WalkBookingStep1'
import SetLocationStep2 from '@components/walk_info/SetLocationStep2'
import ConfirmBookingStep3 from '@components/walk_info/ConfirmBookingStep3'
import { Colors } from '@util'
import { FormikHelpers } from 'formik'
import ClickButton from '@components/input/button/ClickButton'

interface FormValues {
  time: string
  pet: string
}

const WalkBookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const validationSchemer = YUP.object().shape({
    pet: YUP.string().label('Pet').required(),
    time: YUP.string().label('Time').required()
  })

  const onNext = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handleSubmit = async (value: any, { setErrors }: FormikHelpers<FormValues>) => {
    setLoading(true)
    try {
      console.log('Form Submitted:', value)
      // Handle form submission logic here (e.g., API call)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form<FormValues>
      initialValue={{
        time: '',
        pet: ''
      }}
      onSubmit={(value) => {
        console.log(value) // Logs the form values
        onNext() // Proceeds to the next step
      }}
      validationSchema={validationSchemer}
    >
      {/* Step 1: WalkBookingStep1 */}
      {currentStep === 1 && (
        <>
          <WalkBookingStep1
            onNext={() => {
              setCurrentStep(2) // Navigate to Step 2
            }}
          />
          <View style={styles.scheduleButton}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <ClickButton
                mode="outlined"
                title="Schedule"
                onPress={() => console.log('Schedule Pressed')}
              />
            </View>
            <View style={styles.bookButton}>
              <FormSubmitButton
                mode="contained"
                title="Book now"
                onPress={() => {
                  console.log('Book Now button clicked') // Debugging log
                  setCurrentStep(2) // Navigate to Step 2
                  console.log('Current step updated to 2') // Debugging log
                }}
                style={{ zIndex: 1, opacity: 1 }} // Ensure the button is visible and clickable
                disabled={false} // Ensure the button is enabled
              />
            </View>
          </View>
        </>
      )}

      {/* Step 2: SetLocationStep2 */}
      {currentStep === 2 && <SetLocationStep2 />}
      {currentStep === 2 && (
        <View style={styles.doneButton}>
          <FormSubmitButton
            mode="contained"
            title="Confirm Pickup Address"
            loading={loading}
            onPress={() => setCurrentStep(3)} // Navigate to Step 3
          />
        </View>
      )}

      {/* Step 3: ConfirmBookingStep3 */}
      {currentStep === 3 && <ConfirmBookingStep3 />}
      {currentStep === 3 && (
        <View style={styles.doneButton}>
          <FormSubmitButton
            mode="contained"
            title="Confirm Booking"
            loading={loading}
            onPress={() => console.log('Booking Confirmed')}
          />
        </View>
      )}
    </Form>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 20
  },
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  scheduleButton: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  bookButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  cardContainer: {
    justifyContent: 'flex-start'
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
  }
})

export default WalkBookingForm
