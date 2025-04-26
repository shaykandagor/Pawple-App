import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { Walk } from 'app/types'
import { BASE_URL } from 'app/util/constants'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, List } from 'react-native-paper'

type Props = {
  walk: Walk
}

const WalkListItem: React.FC<Props> = ({ walk }) => {
  const formattedTimeClaimed = new Date(walk.timeClaimed).toLocaleString()
  return (
    <TouchableOpacity>
      <List.Item
        title={`${walk.booking.pet.name} ${walk.booking.duration.duration} ${walk.booking.duration.units}`}
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        description={`Walk: ${walk.booking.status} Time Claimed: ${formattedTimeClaimed}`}
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
