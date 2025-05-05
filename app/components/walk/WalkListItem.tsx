import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { mutate } from 'app/api/apiFetcher'
import { useWalkApi } from 'app/api/walks'
import { Walk } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import * as ScreenNames from 'app/screens/ScreenNames'
import { useNavigation } from '@react-navigation/native'

type Props = {
  walk: Walk
}

const WalkListItem: React.FC<Props> = ({ walk }) => {
  const formattedTimeClaimed = new Date(walk.timeClaimed).toLocaleString()
  const formattedTimeCompleted = new Date(walk.endTime).toLocaleString()
  const formattedTimeCanceled = new Date(walk.timeCanceled).toLocaleString()
  const { startWalk } = useWalkApi()
  const navigation: any = useNavigation()

  const confirmWalkStart = () => {
    Alert.alert(
      'Start Walk',
      'Are you sure you want to start this walk?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            startWalk(walk.id).then(() => {
              mutate('/walks')
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (walk.status === 'In Progress') {
          navigation.navigate(ScreenNames.PROGRESS_WALKS, {
            walk
          })
        } else if (walk.status === 'Claimed') {
          confirmWalkStart()
        }
        console.log('Walk status:', walk.status)
      }}
    >
      <List.Item
        title={`${walk.booking.pet.name}, Duration: ${walk.booking.duration.duration} ${walk.booking.duration.units}`}
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        description={` ${
          walk.status === 'Claimed'
            ? `Time Claimed: ${formattedTimeClaimed}`
            : walk.status === 'Completed'
              ? `Time Completed: ${formattedTimeCompleted}`
              : walk.status === 'Canceled'
                ? `Time Canceled: ${formattedTimeCanceled}`
                : ''
        }`}
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
            source={{ uri: `${BASE_URL}/${walk.booking.pet.photoUrl}` }}
          />
        )}
      />
    </TouchableOpacity>
  )
}

export default WalkListItem
