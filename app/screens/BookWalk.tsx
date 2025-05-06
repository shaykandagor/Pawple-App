import ClickButton from '@components/input/button/ClickButton'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@util'
import { StyleSheet, View } from 'react-native'
import { WALK_BOOKING } from './ScreenNames'

const BookWalk = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ClickButton
        icon="dog"
        mode="contained"
        title="Book a Walk"
        onPress={() => navigation.navigate(WALK_BOOKING as never)}
        style={styles.floatingButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  floatingButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  }
})

export default BookWalk
