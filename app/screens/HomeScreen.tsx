import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native'

import { CustomCard, LogoText } from '@component'
import MyPets from '@components/MyPets'
import { Colors } from '@util'
import { RootStackParamList } from '../../Navigation'
import BookWalk from './BookWalk'
import useSession from 'app/session/useSession'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    session: { user }
  } = useSession()
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headingHome}>
          <LogoText width="100%" height={30} />
        </View>
        {!user?.walker && <MyPets />}
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.text}>Community Events</Text>
        </View>
      </View>

      <ScrollView>
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
      </ScrollView>
      {!user?.walker && <BookWalk />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: 10
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
