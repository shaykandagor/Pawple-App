import { SafeAreaView } from 'react-native-safe-area-context'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { Colors } from '@util'
import BookWalk from './BookWalk'
import LogoText from '@components/logo/LogoText'
import useSession from 'app/session/useSession'
import MyPets from '@components/MyPets'

const HomeScreen = () => {
  const {
    session: { user }
  } = useSession()

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            <View style={styles.headingHome}>
              <LogoText width="100%" height={30} />
            </View>
            {!user?.walker && <MyPets />}
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.text}>Community Events</Text>
            </View>
            <View style={styles.cardContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/12538673/pexels-photo-12538673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                }}
                style={styles.bannerImage}
              />
              <Text style={styles.bannerText}>
                Join our community events! Coming soon.
              </Text>
            </View>
          </View>
        </ScrollView>
        {!user?.walker && <BookWalk />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  headingHome: {
    alignItems: 'center',
    padding: 15
  },
  text: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    paddingVertical: 15
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },
  bannerText: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default HomeScreen
