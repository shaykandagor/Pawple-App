import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import { Walk } from 'app/types'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper'

type Props = {
  walk: Walk
}

const WalkListItem: React.FC<Props> = ({ walk }) => {
  return (
    <TouchableOpacity>
      <List.Item
        title={`Status: ${walk.booking.status}`}
        description={`Time Claimed: ${walk.timeClaimed}`}
        right={() => (
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            style={{ color: Colors.primary, paddingLeft: 20 }}
          />
        )}
      />
    </TouchableOpacity>
  )
}

export default WalkListItem
