import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { Booking } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import React from 'react'
import { Avatar, List } from 'react-native-paper'

type Props = {
  booking: Booking
}

const BookingListItem: React.FC<Props> = ({ booking }) => {
  const formattedPickupTime = new Date(booking.pickupTime).toLocaleString()

  return (
    <List.Item
      title={booking.pet.name}
      description={formattedPickupTime}
      right={() => (
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          style={{ color: Colors.primary, paddingLeft: 20 }}
        />
      )}
      left={() => (
        <Avatar.Image
          size={50}
          source={{ uri: `${BASE_URL}/${booking.pet.photoUrl}` }}
        />
      )}
    />
  )
}

export default BookingListItem
