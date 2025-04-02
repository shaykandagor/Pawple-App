import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@util'
import LocationPicker from '../components/maps/location_picker/LocationPicker'
import ClickButton from '../components/input/button/ClickButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Navigation'
import {CONFIRM_BOOKING} from './ScreenNames'

type Props = NativeStackScreenProps<RootStackParamList, 'SetPickUpLocation'>

const SetPickUpLocation: React.FC<Props> = ({ navigation }) => {
  const [petPickupLoc, setPetPickupLocation] = useState<Coordinate>({
    latitude: 60.1100964,
    longitude: 24.6890503
  })
  return (
    <View style={styles.container}>
      <LocationPicker
        location={petPickupLoc}
        onLocationChange={setPetPickupLocation}
        calloutTitle="Pet Pickup Location"
        descriptionExtractor={(markerLocation) =>
          `Latitude: ${markerLocation.latitude}, Longitude: ${markerLocation.longitude}`
        }
        confirmDialogueMessageExtractor={(markerLocation) =>
          `Are you sure you want to select Latitude:${markerLocation.latitude}, Longitude: ${markerLocation.longitude} as pet pickup location?`
        }
      />
      <View style={styles.bottomContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Alippila crossroad"
            subtitle="Apt No. 420, Suintionkatu Rd, Alppila"
            left={(props) => (
              <MaterialCommunityIcons
                name="home-map-marker"
                color={Colors.primaryDark}
                {...props}
              />
            )}
          />
          <View style={styles.confirmButton}>
            <ClickButton
              title="Confirm pick up address"
              onPress={() => {
                navigation.navigate(CONFIRM_BOOKING)
              }}
            />
          </View>
        </Card>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  card: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  confirmButton: {
    padding: 20
  }
})

export default SetPickUpLocation
