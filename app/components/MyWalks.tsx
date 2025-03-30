import { useNavigation } from '@react-navigation/native'
import { usePets } from 'app/api/pets'
import { StyleSheet, View } from 'react-native'
import ClickButton from './input/button/ClickButton'
import { Colors } from '@util'
import { WALK_BOOKING } from 'app/screens/ScreenNames'

const MyWalks = () => {
  const navigation = useNavigation()
  const { pets } = usePets({
    mine: 'true'
  })
  return (
    <View style={styles.container}>
      <View style={styles.bookButton}>
        <ClickButton
          icon="dog"
          mode="contained"
          onPress={() => navigation.navigate(WALK_BOOKING as never)}
          title="Book a walk"
        />
      </View>
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
  }
})

export default MyWalks
