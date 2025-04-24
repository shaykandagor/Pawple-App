import FloatingActionButton from '@components/input/button/FloatingActionButton'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { useBookingApi } from 'app/api/booking'
import { Booking } from 'app/types'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import { Card, List, Text, Divider } from 'react-native-paper'
import * as ScreenNames from 'app/screens/ScreenNames'

type BookingDetailsScreenProps = {
  navigation: any
  route: any
}

const BookingDetailsScreen: React.FC<BookingDetailsScreenProps> = ({
  navigation,
  route
}) => {
  const { claimBooking } = useBookingApi()
  const [loading, setLoading] = useState(false)
  const booking: Booking = route.params?.booking
  const handleClaimBooking = async () => {
    setLoading(true)
    try {
      if (booking) {
        await claimBooking(booking.id)
      }
      navigation.navigate(ScreenNames.MY_WALKS, { booking })
      setLoading(false)
      console.log('Booking claimed successfully')
    } catch (error) {
      console.error('Error claiming booking:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Booking Details</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.walkProfileHome}>
          <Card style={styles.cardContainer}>
            <View style={styles.cardMap}>
              <Card style={styles.cardMap}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                />
              </Card>
            </View>

            <View style={styles.infoContainer}>
              <List.Item
                title="Pick-Up Time"
                description="13:42"
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
                description="30 minutes"
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
                description="14:36"
                left={() => (
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Instructions"
                description="Give the dog food before going out"
                left={() => (
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <Divider style={styles.divider} />
              <List.Item
                title="Dog Park"
                description="Visit the dog park"
                left={() => (
                  <MaterialCommunityIcons
                    name="tree-outline"
                    size={24}
                    style={styles.icon}
                  />
                )}
              />
              <FloatingActionButton
                icon="plus"
                onPress={() => handleClaimBooking()}
              />
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
    padding: 20
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
    justifyContent: 'flex-start',
    flex: 1
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
