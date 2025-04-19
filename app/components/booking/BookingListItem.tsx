import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Booking } from 'app/types'
import { Avatar, List } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { BASE_URL } from 'app/util/constants'

type Props = {
  booking: Booking
}

const BookingListItem: React.FC<Props> = ({ booking }) => {
  return (
    <List.Item
      title={booking.pet.name}
      description={booking.pickupTime}
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

const styles = StyleSheet.create({})
