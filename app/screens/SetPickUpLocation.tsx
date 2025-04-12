import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import LocationPicker from '../components/maps/location_picker/LocationPicker'

type Props = {
  onNext: () => void
  latLng?: Coordinate
  onLocationChange?: (latLng: Coordinate) => void
}

const SetPickUpLocation: React.FC<Props> = ({
  onNext,
  latLng,
  onLocationChange
}) => {
  const [petPickupLoc, setPetPickupLocation] = useState<Coordinate>({
    latitude: latLng?.latitude ?? 60.1100964,
    longitude: latLng?.longitude ?? 24.6890503
  })
  return (
    <View style={styles.container}>
      <LocationPicker
        location={petPickupLoc}
        onLocationChange={(latLng) => {
          setPetPickupLocation(latLng)
          if (onLocationChange) {
            onLocationChange(latLng)
          }
        }}
        calloutTitle="Pet Pickup Location"
        descriptionExtractor={(markerLocation) =>
          `Latitude: ${markerLocation.latitude}, Longitude: ${markerLocation.longitude}`
        }
        confirmDialogueMessageExtractor={(markerLocation) =>
          `Are you sure you want to select Latitude:${markerLocation.latitude}, Longitude: ${markerLocation.longitude} as pet pickup location?`
        }
      />
{/*       <View style={styles.bottomContainer}>
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
            <ClickButton title="Confirm pick up address" onPress={onNext} />
          </View>
        </Card>
      </View> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
