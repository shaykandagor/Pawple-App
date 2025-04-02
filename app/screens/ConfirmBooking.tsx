import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Avatar, Card, Divider, List } from 'react-native-paper'
import Form from '../components/form/Form'
import * as Yup from 'yup'
import FormCheckbox from '../components/input/checkbox/FormCheckbox'
import FormTextInput from '../components/input/text_input/FormTextInput'
import FormSubmitButton from '../components/input/button/FormSubmitButton'
import MapView from 'react-native-maps'
import { Colors } from '@util'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../Navigation'
import {WALK_SUMMARY} from './ScreenNames'

// Use more descriptive names for variables
const validationSchema = Yup.object().shape({
  park: Yup.boolean().label('park'),
  bags: Yup.boolean().label('bags'),
  instructions: Yup.string().label('Instructions')
})

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmBooking'>

const ConfirmBookingScreen: React.FC<Props> = ({ navigation }) => {
  const screenHeight = Dimensions.get('screen').height
  return (
    <ScrollView>
      <Card style={[styles.cardContainer, { height: screenHeight * 0.3 }]}>
        <View style={{ width: '100%', height: '100%' }}>
          <List.Item
            title="Milo"
            description={() => (
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.textDark, fontSize: 16 }}>Time </Text>
                <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>30 min walk</Text>
              </View>
            )}
            right={(props) => (
              <Avatar.Image {...props} source={require('../assets/pet_profile.jpg')} />
            )}
          />

          <Card.Content>
            <Text style={{ color: Colors.textDark, fontSize: 16 }}>Pick up</Text>
            <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>
              Apt No. 420, Suintionkatu Rd, Alppila
            </Text>
          </Card.Content>

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
        </View>
      </Card>

      <Form
        initialValue={{
          park: false,
          bags: false,
          instructions: ''
        }}
        onSubmit={(value) => {
          navigation.navigate(WALK_SUMMARY)
          console.log('WalkSummary', value)
        }}
        validationSchema={validationSchema}
      >
        <View style={styles.content}>
          <View style={styles.checkbox}>
            <Text style={{ color: Colors.textDark, fontSize: 20, fontWeight: '500' }}>
              Requests
            </Text>
            <FormCheckbox name="park" label="Go to a dog park" />
            <FormCheckbox name="bags" label="Bring disposable bags" />

            <Divider />
            <Text
              style={{
                color: Colors.textDark,
                fontSize: 20,
                fontWeight: '500',
                paddingBottom: 10,
                paddingTop: 10
              }}
            >
              Special Instructions
            </Text>
            <FormTextInput
              name="instructions"
              placeholder="Type a custom instruction for your dog walker here"
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text
            style={{
              color: Colors.textDark,
              fontSize: 20,
              fontWeight: '500',
              padding: 10
            }}
          >
            Payment
          </Text>

          <View style={styles.paymentContent}>
            <Text style={{ color: Colors.neutralDark, fontSize: 16 }}>30 min walk</Text>
            <Text style={{ color: Colors.textDark, fontSize: 18, fontWeight: '500' }}>08.00€</Text>
          </View>

          <View style={styles.paymentContent}>
            <Text style={{ color: Colors.primary, fontSize: 18 }}>Discount</Text>
            <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}>-1.20€</Text>
          </View>
          <Divider />
          <View style={styles.paymentContent}>
            <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}>TOTAL</Text>
            <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '500' }}>6.80€</Text>
          </View>

          <View style={styles.confirmButton}>
            <FormSubmitButton mode="contained" title="Select Payment Mode" />
          </View>
        </View>
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20
  },
  cardMap: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  content: {
    backgroundColor: Colors.white,
    paddingTop: 10,
    borderTopWidth: 10,
    borderTopColor: Colors.lightGray,
    borderBottomColor: Colors.lightGray,
    padding: 10
  },
  checkbox: {
    padding: 15
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  paymentContent: {
    padding: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ConfirmBookingScreen
