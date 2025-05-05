import CustomError from '@components/custom_error/CustomError'
import ChipSelector from '@components/input/chip_selector/ChipSelector'
import ListLoadingSkeleton from '@components/loading/ListLoadingSkeleton'
import WalkListItem from '@components/walk/WalkListItem'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { useWalks } from 'app/api/walks'
import useSession from 'app/session/useSession'
import { Walk } from 'app/types'
import { DrawerParamList } from 'Navigation'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = NativeStackScreenProps<DrawerParamList, 'MyWalks'>

const MyWalks: React.FC<Props> = ({ navigation }) => {
  const { walks, isLoading, error } = useWalks()
  const {
    session: { user }
  } = useSession()
  const [selectedFilter, setSelectedFilter] = useState<Walk['status'] | 'All'>(
    'All'
  ) // Default to "Open"
  // Debugging: Log the selected filter
  console.log('Selected Filter:', selectedFilter)

  // Filter the walks based on the selected filter
  const filteredWalks = walks.filter((walk) => {
    if (selectedFilter === 'All') return true // If no filter is selected, show all walks

    return walk.status === selectedFilter
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
        <Text style={styles.text}>My Walks</Text>
        <ChipSelector
          options={['All', 'In Progress', 'Claimed', 'Canceled', 'Completed']}
          selectedOptions={[selectedFilter as string]}
          onSelect={(selected) => {
            console.log('Chip Selected:', selected)
            if (selected.length > 0) {
              setSelectedFilter(
                selected[selected.length - 1] as Walk['status'] | 'All'
              )
            }
          }}
          mode="flat"
          icon="check"
        />
      </View>
      <FlatList
        data={filteredWalks}
        keyExtractor={(item: Walk) => item.id}
        renderItem={({ item }) => <WalkListItem walk={item} />}
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

export default MyWalks
