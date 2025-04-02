import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import { Card, Divider, List } from 'react-native-paper'
import ClickButton from '../components/input/button/ClickButton'
import { Colors } from '../util/colors'

interface WalkSummaryProps {
  navigation: any
}

const WalkSummary: React.FC<WalkSummaryProps> = ({ navigation }) => {
  const screenHeight = Dimensions.get('screen').height
  return (
    <ScrollView>
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
                <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>13:42</Text>
              </View>
            )}
            right={(props) => (
              <Text {...props} style={{ color: Colors.textDark, fontSize: 30, fontWeight: '500' }}>
                1.2 km
              </Text>
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
            title="Drop Off"
            description={() => (
              <View>
                <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>14:36</Text>
              </View>
            )}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ marginRight: 5 }} source={require('../assets/dog_pee.jpg')} />
                <Image source={require('../assets/dog_pooping.jpg')} />
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

          <View style={styles.content}>
            <Text style={{ color: Colors.textDark, fontSize: 20, fontWeight: '600' }}>
              Rate your walker
            </Text>
          </View>

          <View style={{ padding: 20 }}>
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 10,
                flexDirection: 'row',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}
            >
              <MaterialCommunityIcons name="star" size={50} color={Colors.emoji} />
              <MaterialCommunityIcons name="star" size={50} color={Colors.emoji} />
              <MaterialCommunityIcons name="star" size={50} color={Colors.emoji} />
              <MaterialCommunityIcons name="star" size={50} color={Colors.emoji} />
              <MaterialCommunityIcons name="star" size={50} color={Colors.emoji} />
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.payment}>
        <Text style={{ color: Colors.textDark, fontSize: 20, fontWeight: '500', padding: 20 }}>
          Payment
        </Text>

        <View style={styles.paymentContent}>
          <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>Walker</Text>
          <Text style={{ color: Colors.textDark, fontSize: 18, fontWeight: '500' }}>11.86€</Text>
        </View>

        <View style={styles.paymentContent}>
          <Text style={{ color: Colors.primary, fontSize: 18 }}>Discount</Text>
          <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}>-1.78€</Text>
        </View>
        <Divider />
        <View style={styles.paymentContent}>
          <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}>TOTAL</Text>
          <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}>10.80€</Text>
        </View>

        {/* <Form
                    onSubmit={(value) => {
                        console.log(value);
                    }}
                >
                    <View style={styles.submitButton}>
                        <FormSubmitButton mode="outlined" title="Get help with walk" />
                    </View>
                </Form> */}

        <View style={styles.submitButton}>
          <ClickButton
            mode="outlined"
            title="Get help with walk"
            onPress={() => {
              console.log('Pressed')
            }}
          />
        </View>
      </Card>
    </ScrollView>
  )
}

export default WalkSummary

const styles = StyleSheet.create({
  cardContainer: {
    borderTopWidth: 10,
    paddingTop: 10,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white
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
    padding: 15
  },
  payment: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    borderTopWidth: 10,
    borderTopColor: Colors.lightGray,
    padding: 10
  },
  paymentContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})
