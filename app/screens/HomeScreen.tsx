import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { CustomCard, LogoText } from '@component'
import MyPets from '@components/MyPets'
import { Colors } from '@util'
import { RootStackParamList } from '../../Navigation'
import BookWalk from './BookWalk'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headingHome}>
          <LogoText width="100%" height={30} />
        </View>
        <MyPets />
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={styles.text}>Community Events</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.cardContainer}>
          <CustomCard
            title="Hakaniemi Group Walk"
            subTitle="Oct 24 at 6:00 pm"
            mode="contained"
            image="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CustomCard
            title="Hakaniemi Group Walk"
            subTitle="Oct 24 at 6:00 pm"
            mode="contained"
            image="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CustomCard
            title="Hakaniemi Group Walk"
            subTitle="Oct 24 at 6:00 pm"
            mode="contained"
            image="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CustomCard
            title="Hakaniemi Group Walk"
            subTitle="Oct 24 at 6:00 pm"
            mode="contained"
            image="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </View>
      </ScrollView>
      <BookWalk />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20
  },
  contentContainer: {
    padding: 20
  },
  headingHome: {
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    paddingVertical: 15
  },
  petProfileHome: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  space: {
    width: 10
  },
  bookButton: {
    alignSelf: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 20,
    zIndex: 1
  },
  cardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  bookText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
    paddingBottom: 15
  },
  selectText: {
    fontSize: 14,
    color: Colors.textLight
  },
  petProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  bookButtons: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  agreeText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  linkText: {
    color: Colors.primary,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  cardText: {
    fontSize: 15,
    color: Colors.textGray
  }
})

export default HomeScreen
