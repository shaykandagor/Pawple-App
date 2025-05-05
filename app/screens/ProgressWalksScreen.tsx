import ClickButton from '@components/input/button/ClickButton'
import { useLocationTracker } from '@components/maps/hooks/useLocationTracker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'Navigation'
import { useWalkApi, useWalkRoutePoints } from 'app/api/walks'
import { Walk } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import React, { useEffect, useMemo, useRef } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps'
import { Avatar, Card, Text } from 'react-native-paper'
import { mutate } from 'swr'

type Props = NativeStackScreenProps<RootStackParamList, 'ProgressWalks'>

const ProgressWalksScreen: React.FC<Props> = ({ navigation, route }) => {
  const { location, errorMsg } = useLocationTracker()
  const mapRef = useRef<MapView>(null)

  const { endWalk, addRoutePoint } = useWalkApi()
  const walk: Walk = (route?.params as any)?.walk
  const formattedStartTime = new Date(walk.startTime).toLocaleString()
  const { walkRoutePoints, isLoading, error } = useWalkRoutePoints(walk?.id)

  const confirmEndWalk = () => {
    Alert.alert(
      'End Walk',
      'Are you sure you want to end this walk?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            endWalk(walk.id).then(() => {
              mutate('/walks')
              navigation.goBack()
            })
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    )
  }

  const points = useMemo<LatLng[]>(() => {
    return walkRoutePoints.map((point) => ({
      latitude: parseFloat(point.latitude),
      longitude: parseFloat(point.longitude)
    }))
  }, [walkRoutePoints])

  const edgePoints = useMemo<LatLng[] | null>(() => {
    if (points.length >= 2) {
      return [points[0], points.at(-1)!]
    }
    return null
  }, [points])

  useEffect(() => {
    if (location) {
      addRoutePoint(walk?.id, location.coords).then(() => {
        mutate(`/walks/${walk?.id}/route`)
      })
    }
  }, [location])

  useEffect(() => {
    if (mapRef.current && walkRoutePoints.length > 0) {
      mapRef.current.fitToCoordinates(points, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
        animated: true
      })
    }
  }, [walkRoutePoints, points])

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  if (error || errorMsg)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading walk route points or accessing phone location</Text>
        <Text>{error?.message ?? errorMsg}</Text>
      </View>
    )

  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <MapView style={{ width: '100%', height: '100%' }} ref={mapRef}>
        {(edgePoints ?? []).map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={'Title'}
            description={'description'}
          />
        ))}
        <Polyline
          coordinates={points}
          strokeColor="#000"
          strokeColors={[
            '#7F0000',
            '#00000000',
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <Card style={styles.card}>
          <Card.Title
            title={`${walk.booking.pet.name} - ${walk.status}`}
            titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
            subtitle={`${formattedStartTime} - ${walk.booking.duration.duration} ${walk.booking.duration.units}`}
            left={() => (
              <View>
                <Avatar.Image
                  size={50}
                  source={{ uri: `${BASE_URL}/${walk.booking.pet.photoUrl}` }}
                />
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.backButton}>
              <ClickButton
                mode="outlined"
                title="Back"
                onPress={navigation.goBack}
              />
            </View>
            <View style={styles.backButton}></View>
            <View style={styles.confirmButton}>
              <ClickButton title="End Walk" onPress={confirmEndWalk} />
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default ProgressWalksScreen

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
})
