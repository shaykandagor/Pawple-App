import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useLocate from '../hooks/useLocate'
import MapView, { Marker } from 'react-native-maps'

export interface Coordinate {
  latitude: number
  longitude: number
}

interface LocationPickerProps {
  location?: Coordinate
  onLocationChange: (location: Coordinate) => void
  confirmDialogueMessageExtractor?: (location: Coordinate) => string
  calloutTitle?: string
  descriptionExtractor?: (location: Coordinate) => string
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  onLocationChange,
  confirmDialogueMessageExtractor,
  calloutTitle,
  descriptionExtractor
}) => {
  const { location: currentLocation } = useLocate()
  const [markerLocation, setMarkerLocation] = useState<Coordinate>()

  useEffect(() => {
    if (!location && currentLocation) setMarkerLocation(currentLocation)
    if (location) setMarkerLocation(location)
  }, [currentLocation])

  return (
    <View style={styles.mapContainer}>
      {markerLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: markerLocation.latitude,
            longitude: markerLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            draggable
            onDragEnd={(event) => setMarkerLocation(event.nativeEvent.coordinate)}
            coordinate={markerLocation}
            title={calloutTitle}
            description={descriptionExtractor ? descriptionExtractor(markerLocation) : undefined}
            onCalloutPress={() =>
              Alert.alert(
                'Confirmation',
                confirmDialogueMessageExtractor
                  ? confirmDialogueMessageExtractor(markerLocation)
                  : 'Are you sure you want to select that location?',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      onLocationChange(markerLocation)
                    }
                  },
                  { text: 'No' }
                ]
              )
            }
          />
        </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})

export default LocationPicker
