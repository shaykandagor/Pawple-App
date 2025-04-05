import ClickButton from '@components/input/button/ClickButton'
import FormSubmitButton from '@components/input/button/FormSubmitButton'
import ConfirmBookingStep3 from '@components/walk_info/ConfirmBookingStep3'
import SetLocationStep2 from '@components/walk_info/SetLocationStep2'
import WalkBookingStep1 from '@components/walk_info/WalkBookingStep1'
import { Colors } from '@util'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'



const WalkBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)


  return (
    <>
      {/* Step 1: WalkBookingStep1 */}
      {currentStep === 1 && (
        <>
          <WalkBookingStep1
            onNext={() => {
              setCurrentStep(2) // Navigate to Step 2
            }}
          
          />
        </>
      )}

      {/* Step 2: SetLocationStep2 */}
      {currentStep === 2 && <SetLocationStep2 />}
      {currentStep === 2 && (
        <View style={styles.doneButton}>
          <FormSubmitButton
            mode="contained"
            title="Confirm Pickup Address"
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
            onPress={() => console.log('Booking Confirmed')}
          />
        </View>
      )}
    </>
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
