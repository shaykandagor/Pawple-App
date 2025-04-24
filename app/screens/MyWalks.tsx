import CustomError from '@components/custom_error/CustomError'
import LoadingSkeleton from '@components/loading/LoadingSkeleton'
import WalkListItem from '@components/walk/WalkListItem'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors } from '@util'
import { useWalks } from 'app/api/walks'
import { Walk } from 'app/types'
import { User } from 'app/types/session'
import { DrawerParamList } from 'Navigation'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = NativeStackScreenProps<DrawerParamList, 'MyWalks'>

const MyWalks: React.FC<Props> = ({ navigation }) => {
  const { walks, isLoading, error } = useWalks()

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
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
      </View>
      <FlatList
        data={walks}
        keyExtractor={(item: Walk) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log('Walk clicked', item.id)}
          >
            <WalkListItem walk={item} />
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

export default MyWalks
function useMemo(
  arg0: () => 'walker' | 'owner' | undefined,
  arg1: (User | undefined)[]
) {
  throw new Error('Function not implemented.')
}
