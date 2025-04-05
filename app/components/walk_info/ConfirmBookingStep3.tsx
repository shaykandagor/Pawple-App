import ClickButton from '@components/input/button/ClickButton'
import FormSubmitButton from '@components/input/button/FormSubmitButton'
import { useFormikContext } from 'formik'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

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
}

const ConfirmBookingStep3 = ({
  onPrev,
  isSubmitting
}: ConfirmBookingStep3Props) => {
  const { values, errors, setFieldValue } = useFormikContext<FormValues>()
  return (
    <View>
      <Text>Confirm Booking Step 3</Text>
      <Text>{JSON.stringify(values, null, 2)}</Text>
      <View style={styles.doneButton}>
        <FormSubmitButton
          mode="contained"
          title="Book Now"
          loading={isSubmitting}
        />
      </View>
      <View style={styles.doneButton}>
        <ClickButton mode="contained" title="Back" onPress={onPrev} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
})

export default ConfirmBookingStep3
