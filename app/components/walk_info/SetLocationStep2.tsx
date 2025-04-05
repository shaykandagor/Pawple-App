import ClickButton from '@components/input/button/ClickButton'
import SetPickUpLocation from 'app/screens/SetPickUpLocation'
import { useFormikContext } from 'formik'
import { StyleSheet, View } from 'react-native'

type SetLocationStep2Props = {
  onNext: () => void
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

const SetLocationStep2: React.FC<SetLocationStep2Props> = ({
  onNext,
  onPrev
}) => {
  const { values, errors, setFieldValue } = useFormikContext<FormValues>()
  return (
    <View style={{ flex: 1 }}>
      <SetPickUpLocation
        onNext={onNext}
        latLng={{
          latitude: values.pickupAddress?.lat,
          longitude: values.pickupAddress?.lng
        }}
        onLocationChange={(latLng) => {
          setFieldValue('pickupAddress', {
            lat: latLng.latitude,
            lng: latLng.longitude,
            address: ''
          })
        }}
      />
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

export default SetLocationStep2
