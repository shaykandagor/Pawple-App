import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { Colors } from '@util'
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import MapView from 'react-native-maps'
import { Card, List, Text } from 'react-native-paper'



const BookingDetailsScreen = () => {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Your Bookings</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.walkProfileHome}>
              <Card style={[styles.cardContainer]}>
                <View style={{ width: '100%', height: '100%' }}>
                  <Card style={styles.cardMap}>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      }}
                    />
                  </Card>

                  <List.Item
                    title="PickUp"
                    description={() => (
                      <View>
                        <Text
                          style={{ color: Colors.neutralDark, fontSize: 16 }}
                        >
                          13:42
                        </Text>
                      </View>
                    )}
                    left={() => (
                      <MaterialCommunityIcons
                        name="origin"
                        size={20}
                        style={{ color: Colors.primary, paddingLeft: 20 }}
                      />
                    )}
                  />

                  <List.Item
                    title="Duration"
                    description={() => (
                      <View>
                        <Text
                          style={{ color: Colors.neutralDark, fontSize: 16 }}
                        >
                          30 minutes
                        </Text>
                      </View>
                    )}
                    left={() => (
                      <MaterialCommunityIcons
                        name="timer"
                        size={20}
                        style={{ color: Colors.primary, paddingLeft: 20 }}
                      />
                    )}
                  />

                  <List.Item
                    title="Drop off"
                    description={() => (
                      <View>
                        <Text
                          style={{ color: Colors.neutralDark, fontSize: 16 }}
                        >
                          14:36
                        </Text>
                      </View>
                    )}
                    left={() => (
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        style={{ color: Colors.primary, paddingLeft: 20 }}
                      />
                    )}
                  />
                  <List.Item
                    title="Instructions"
                    description={() => (
                      <View>
                        <Text
                          style={{ color: Colors.neutralDark, fontSize: 16 }}
                        >
                          Give the dog food before going out
                        </Text>
                      </View>
                    )}
                    left={() => (
                      <MaterialCommunityIcons
                        name="information"
                        size={20}
                        style={{ color: Colors.primary, paddingLeft: 20 }}
                      />
                    )}
                  />
                  <List.Item
                    title="Dog Park"
                    description={() => (
                      <View>
                        <Text
                          style={{ color: Colors.neutralDark, fontSize: 16 }}
                        >
                          Visit the dog park
                        </Text>
                      </View>
                    )}
                    left={() => (
                      <MaterialCommunityIcons
                        name="information"
                        size={20}
                        style={{ color: Colors.primary, paddingLeft: 20 }}
                      />
                    )}
                  />
                </View>
              </Card>
          
        </View>
      </ScrollView>
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

export default BookingDetailsScreen
