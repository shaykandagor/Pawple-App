import FloatingActionButton from '@components/input/button/FloatingActionButton'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { useBookingApi } from 'app/api/booking'
import * as ScreenNames from 'app/screens/ScreenNames'
import useSession from 'app/session/useSession'
import { Booking } from 'app/types'
import { useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Card, Divider, List, Text } from 'react-native-paper'
import { mutate } from 'swr'

type BookingDetailsScreenProps = {
  navigation: any
  route: any
}

const BookingDetailsScreen: React.FC<BookingDetailsScreenProps> = ({
  navigation,
  route
}) => {
  const {
    session: { user }
  } = useSession()
  const { claimBooking, deleteBooking } = useBookingApi()
  const [loading, setLoading] = useState(false)
  const booking: Booking = route.params?.booking
  const handleClaimBooking = async () => {
    setLoading(true)
    try {
      if (booking) {
        await claimBooking(booking.id)
      }
      mutate('/bookings')
      mutate('/walks')
      navigation.navigate(ScreenNames.MY_WALKS, { booking })
      setLoading(false)
      console.log('Booking claimed successfully')
    } catch (error) {
      console.error('Error claiming booking:', error)
    }
  }
  const formattedPickupTime = new Date(booking.pickupTime).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  )
  const handleDelete = async () => {
    // Before deleting the pet, we want to confirm with the user.
    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete this booking?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            // If the user confirms, we delete the pet.
            if (booking) {
              await deleteBooking(booking.id)
            }
            // After successfully deleting the pet, we want to navigate back to the pets list screen.
            // The mutate function is called to refresh the pets list.
            mutate('/bookings')
            navigation.navigate(ScreenNames.MY_BOOKINGS)
          }
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Booking Details</Text>
      </View>
      <View style={{ position: 'absolute', top: 10, right: 10 }}>
        {!user?.walker && (
          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={30}
              color={Colors.textDark}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View style={styles.walkProfileHome}>
          <Card style={styles.cardContainer}>
            <View style={styles.cardMap}>
              <Card style={styles.cardMap}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: booking.pickupAddress.lat,
                    longitude: booking.pickupAddress.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: booking.pickupAddress.lat,
                      longitude: booking.pickupAddress.lng
                    }}
                    title="Pickup Location"
                    description="Your pickup location"
                  />
                </MapView>
              </Card>
            </View>

            <View style={styles.infoContainer}>
              <List.Item
                title="Pick-Up Time"
                description={formattedPickupTime}
                left={() => (
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Duration"
                description={`${booking.duration?.duration} ${booking.duration?.units}`}
                left={() => (
                  <MaterialCommunityIcons
                    name="timer"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Drop-Off Time"
                description={(() => {
                  const pickupTime = new Date(booking.pickupTime)
                  const durationInMs =
                    booking.duration?.duration *
                    (booking.duration?.units === 'hours' ? 3600000 : 60000)
                  const endTime = new Date(pickupTime.getTime() + durationInMs)

                  if (booking.duration?.units === 'hours') {
                    endTime.setHours(
                      pickupTime.getHours() + booking.duration?.duration
                    )
                  } else {
                    endTime.setMinutes(
                      pickupTime.getMinutes() + booking.duration?.duration
                    )
                  }

                  return endTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                })()}
                left={() => (
                  <MaterialCommunityIcons
                    name="clock-end"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Instructions"
                description={booking.instructions}
                left={() => (
                  <MaterialCommunityIcons
                    name="note-text-outline"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Dog Park"
                description={booking.visitPark ? 'Yes' : 'No'}
                left={() => (
                  <MaterialCommunityIcons
                    name="pine-tree"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <List.Item
                title="Bring Disposable Bags"
                description={booking.bringDisposableBags ? 'Yes' : 'No'}
                left={() => (
                  <MaterialCommunityIcons
                    name="bag-personal-outline"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              {user?.walker && (
                <FloatingActionButton
                  icon="plus"
                  onPress={() => handleClaimBooking()}
                />
              )}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 35
  },
  header: {
    marginBottom: 20,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  walkProfileHome: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  cardContainer: {
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardMap: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  map: {
    width: '100%',
    height: 200
  },
  infoContainer: {
    marginTop: 10
  },
  icon: {
    color: Colors.primary,
    marginRight: 10
  },
  divider: {
    marginVertical: 5,
    backgroundColor: Colors.lightGray
  }
})

export default BookingDetailsScreen
