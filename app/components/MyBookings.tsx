import { Colors } from '@util'
import { useBookings } from 'app/api/booking'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomError from './custom_error/CustomError'
import { Text } from 'react-native-paper'
import { Booking } from 'app/types'
import * as ScreenNames from 'app/screens/ScreenNames'
import { DrawerParamList } from 'Navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import BookingListItem from './booking/BookingListItem'
import useSession from 'app/session/useSession'
import { useMemo } from 'react'
import ListLoadingSkeleton from './loading/ListLoadingSkeleton'

type Props = NativeStackScreenProps<DrawerParamList, 'MyBookings'>

const MyBookings: React.FC<Props> = ({ navigation, route }) => {
  const {
    session: { user }
  } = useSession()
  const role = useMemo(() => {
    if (user?.walker) {
      return 'walker'
    } else if (user?.owner) {
      return 'owner'
    }
  }, [user])
  const { bookings, isLoading, error } = useBookings({
    mine: role == 'owner' ? 'true' : undefined,
    includeOnlyActiveBookings: role == 'walker' ? 'true' : undefined
  })
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ListLoadingSkeleton />
        <ListLoadingSkeleton />
        <ListLoadingSkeleton />
        <ListLoadingSkeleton />
      </View>
    )
  }
  if (error) {
    return (
      <View>
        <CustomError errorMessage={error.message} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Your Bookings</Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item: Booking) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenNames.BOOKING_DETAILS as any, {
                booking: item
              })
            }
          >
            <BookingListItem booking={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10
  },
  bookButton: {
    alignSelf: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 20,
    zIndex: 1
  },
  text: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    paddingVertical: 15
  },
  walkProfileHome: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  cardContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white
  },
  loading: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15
  },
  cardMap: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  content: {
    padding: 20
  }
})

export default MyBookings
