import { SafeAreaView } from 'react-native-safe-area-context'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { Colors } from '@util'
import BookWalk from './BookWalk'
import LogoText from '@components/logo/LogoText'
import useSession from 'app/session/useSession'
import MyPets from '@components/MyPets'
import { MaterialIcons } from '@expo/vector-icons'
import * as ScreenNames from 'app/screens/ScreenNames'

type Props = {
  navigation: any
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
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
            {/* Logo Section */}
            <View style={styles.headingHome}>
              <LogoText width="100%" height={30} />
            </View>

            {/* Banner Section */}
            <View style={styles.bannerContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/7210469/pexels-photo-7210469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }}
                style={styles.bannerImage}
              />
              <Text style={styles.bannerText}>
                Discover exciting walking services and events near you!
              </Text>
              {!user?.walker && (
                <TouchableOpacity
                  style={styles.bannerButton}
                  onPress={() => navigation.navigate(ScreenNames.WALK_BOOKING)}
                >
                  <Text style={styles.bannerButtonText}>Book a walk</Text>
                </TouchableOpacity>
              )}
              {user?.walker && (
                <TouchableOpacity
                  style={styles.bannerButton}
                  onPress={() => navigation.navigate(ScreenNames.MY_WALKS)}
                >
                  <Text style={styles.bannerButtonText}>Explore walks</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* My Pets Section */}
            {!user?.walker && <MyPets />}

            {/* Quick Links Section */}
            <View style={styles.quickLinksContainer}>
              <Text style={styles.sectionTitle}>Explore</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickLinks}
              >
                <TouchableOpacity
                  style={styles.quickLinkCard}
                  onPress={() => navigation.navigate(ScreenNames.MY_BOOKINGS)}
                >
                  <MaterialIcons
                    name="event-note"
                    size={40}
                    color={Colors.primary}
                  />
                  <Text style={styles.quickLinkText}>My Bookings</Text>
                </TouchableOpacity>
                {user?.walker && (
                  <TouchableOpacity
                    style={styles.quickLinkCard}
                    onPress={() => navigation.navigate(ScreenNames.MY_WALKS)}
                  >
                    <MaterialIcons
                      name="directions-walk"
                      size={40}
                      color={Colors.primary}
                    />
                    <Text style={styles.quickLinkText}>My Walks</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.quickLinkCard}
                  onPress={() => navigation.navigate(ScreenNames.HOME)}
                >
                  <MaterialIcons
                    name="group"
                    size={40}
                    color={Colors.primary}
                  />
                  <Text style={styles.quickLinkText}>Community</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* Community Events Section */}
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

        {/* Book Walk Section */}
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
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 2,
    paddingHorizontal: 15
  },
  bannerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  bannerButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
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
  },
  quickLinksContainer: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 10
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 10
  },
  quickLinkCard: {
    width: 100,
    height: 100,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10
  },
  quickLinkText: {
    fontSize: 14,
    color: Colors.textDark,
    textAlign: 'center',
    marginTop: 5
  }
})

export default HomeScreen
