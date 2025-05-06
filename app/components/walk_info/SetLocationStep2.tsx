import ClickButton from '@components/input/button/ClickButton'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import SetPickUpLocation from 'app/screens/SetPickUpLocation'
import { useFormikContext } from 'formik'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaViewBase,
  StyleSheet,
  View
} from 'react-native'
import { Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1}} edges={['bottom', 'left', 'right']}>
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
                address: 'pickup address'
              })
            }}
          />
          <View style={styles.bottomContainer}>
            <Card style={styles.card}>
              <Card.Title
                title="Pickup address"
                subtitle="Drag the marker to select the pickup address"
                left={(props) => (
                  <MaterialCommunityIcons
                    name="home-map-marker"
                    color={Colors.primaryDark}
                    {...props}
                  />
                )}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.backButton}>
                  <ClickButton mode="outlined" title="Back" onPress={onPrev} />
                </View>
                <View style={styles.confirmButton}>
                  <ClickButton
                    title="Confirm pick up address"
                    onPress={onNext}
                  />
                </View>
              </View>
            </Card>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmButton: {
    padding: 10,
    justifyContent: 'center'
  },
  backButton: {
    padding: 10,
    justifyContent: 'center',
    marginRight: 10
  },
  bottomContainer: {
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  card: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})

export default SetLocationStep2
